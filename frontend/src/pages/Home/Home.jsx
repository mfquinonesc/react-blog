import { useState, useEffect } from "react";
import { useParams,  useNavigate, useLocation } from "react-router-dom";

import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import Post from "../../components/Post/Post";
import Editor from "../../components/Editor/Editor";
import  postService  from "../../services/postService";
import { useUser } from "../../contexts/UserContext";
import useAuthorization from "../../hooks/useAuthorization";
import Searcher from "../../components/Searcher/Searcher";

export default function Home() {   

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchField, setSearchField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(true);

  const { user } = useUser();
  const { edition } = useAuthorization(user);
  const navigate = useNavigate();
  const { postId } = useParams();
  const location = useLocation();

  useEffect(()=>{
    const getPosts = async () => {
      setIsLoading(true);
      const result = postId? await postService.get(postId): await postService.getAll();   
      const list = postId ? [result.data.post] : result.data.posts;
      setPosts(list);
      setFilteredPosts(list);
      setIsLoading(false);
      setPreview(!postId);
    }
    getPosts();
  },[location]);  

  const openEditor = (value, comment = false) => {
    setComment(comment);
    setOpen(value);
  }

  const readPost = (id) => {
    const post = posts.filter((p) => { return p.post.postId == id });
    if (post) {
      setFilteredPosts(post);
      navigate(`/posts/${id}`);
      setPreview(false);
    }
  }

  const searchPost = (query) => {   
    
    const lowerQuery = query.toLowerCase().trim();

    if(lowerQuery && posts && posts.length > 0) {
      const list = posts.filter((p)=>{

        const inPost = p.post.title.toLowerCase().includes(lowerQuery) || p.post.content.toLowerCase().includes(lowerQuery);

        const inAuthor = `${p.author.name} ${p.author.lastname}`.toLowerCase().includes(lowerQuery);

        const inComments = p.comments.some(({ comment, author }) =>
          comment.content.toLowerCase().includes(lowerQuery) ||
          `${author.name} ${author.lastname}`.toLowerCase().includes(lowerQuery)
        );

        return inPost || inAuthor || inComments;
      });

      setFilteredPosts(list);
      return;
    }

    setFilteredPosts(posts);
  }

  return (
    <>
      <Header onEdit={(val)=>openEditor(val)} onSearch={(q)=> searchPost(q)} onSearchActive={(e)=>setSearchField(e)} showButton={searchField}></Header>
      <section className="hero is-fullheight-with-navbar mt-6 pt-5">

        <div className="container columns">

          <main className="column is-8">

            {isLoading && <div className="is-flex is-flex-direction-row is-justify-content-center mb-5">
              <a className="button is-loading is-large" style={{border:'none'}}></a>
            </div>}

            {!isLoading && <>

              {searchField && <div className="mb-5">
                <Searcher onChange={(q) => searchPost(q)} onClose={(e) => setSearchField(false)} />
              </div>}

              {(posts.length == 0) && <article className="mb-6 is-flex is-flex-direction-row is-justify-content-space-between">
                <div className="ml-5">
                  <h2 className="title is-size-4 mb-3 has-text-primary has-text-weight-semibold">No posts yet</h2>
                  <p>
                    It looks like there are no posts.
                    {edition && <span className="ml-1">Why not write your first one?
                      <a className="icon has-text-primary ml-1" onClick={() => openEditor(true)}>
                        <i className="fa-solid fa-pencil"></i>
                      </a>
                    </span>}
                  </p>
                </div>
              </article>}

              {filteredPosts.map((p, ind) => {
                return (
                  <Post key={ind} post={p} preview={preview} onComment={(val) => openEditor(val, true)} onReading={(id) => readPost(id)}></Post>
                )
              }
              )}

            </>}
                       
          </main>
            
          <aside  className="column is-4"> 
            {/* Here comes the lateral content */}
          </aside>

        </div>         
        
      </section>
      <Footer></Footer>
      <Editor open={open} comment={comment} onClose={(val)=>openEditor(val)}></Editor>
    </>
  );
}
