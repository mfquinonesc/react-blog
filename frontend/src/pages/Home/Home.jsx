import { useState, useEffect } from "react";

import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import Post from "../../components/Post/Post";
import Editor from "../../components/Editor/Editor";
import  postService  from "../../services/postService";
import { useUser } from "../../contexts/UserContext";
import useAuthorization from "../../hooks/useAuthorization";

export default function Home() {   

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(false);
  const [posts, setPosts] = useState([]);

  const { user } = useUser();
  const { edition } = useAuthorization(user);

  const openEditor = (value, comment = false)=>{
    setComment(comment);
    setOpen(value);
  }

  useEffect(()=>{
    const getPosts = async () => {
      const result = await postService.getAll();
      setPosts(result.data.posts);
    }
    getPosts();   
  },[]);  

  return (
    <>
      <Header onEdit={(val)=>openEditor(val)}></Header>
      <section className="hero is-fullheight-with-navbar mt-6 pt-5">

        <div className="container columns">

          <main className="column is-8">

            {(posts.length == 0)&&<article className="mb-6 is-flex is-flex-direction-row is-justify-content-space-between">
              <div className="ml-5">                  
                <h2 className="title is-size-4 mb-3 has-text-primary has-text-weight-semibold">No posts yet</h2>
                <p> 
                  It looks like there are no posts. 
                    {edition&&<span className="ml-1">Why not write your first one?  
                      <a className="icon has-text-primary ml-1" onClick={()=>openEditor(true)}>
                        <i className="fa-solid fa-pencil"></i>
                      </a>
                    </span>}                     
                </p>           
              </div>
            </article>}

            {posts.map((p,ind)=> {
              return (
                <Post key={ind} post={p} preview={true} onComment={(val)=>openEditor(val,true)}></Post>
              )}
            )} 
            
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
