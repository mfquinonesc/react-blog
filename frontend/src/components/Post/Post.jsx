import Slider from "../Slider/Slider";
import Comment from "../Comment/Comment";
import { toUpperFirst, formatDate, trucateWords } from "../../utilities/utils";
import { useUser } from "../../contexts/UserContext";
import useAuthorization from "../../hooks/useAuthorization";

export default function PostPreview({ post, preview = false, onComment }){  
    
    const WORD_LIMIT = 40;

    const { user } = useUser();
    const { edition } = useAuthorization(user);

    const images = post.image && post.image.length > 0;

    const comment = ()=>{
        if(onComment){
            onComment(true);
        }
    }
   
    return(
    <article className="mb-6">

        {images&&<Slider images={post.image}></Slider>}

        <div className={`media-content ${images?'mt-3':''}`} >

            <h2 className="title is-size-4 mb-3 has-text-primary has-text-weight-semibold">{post.post.title}</h2>

            <div className="content">

                <p className="has-text-text">
                    <span className="mr-5">
                        <i className="fa-solid fa-user has-text-primary mr-2"></i>
                        { post.author? `${toUpperFirst(post.author.name)} ${toUpperFirst(post.author.lastname)}`:'Unknown' }
                    </span>
                    <span className="mr-5">
                        <i className="fa-solid fa-calendar-week has-text-primary mr-2"></i>
                        {formatDate(post.post.createdAt)}
                    </span>
                    <span className="mr-5">
                        <i className="fa-solid fa-comment has-text-primary mr-2"></i>
                        {post.comments.length}
                    </span>
                    <span className="mr-5">
                        <a className="icon">                            
                            <i className={`fa-solid fa-heart mr-2 ${post.like?'has-text-primary':'has-text-grey-light'}`}></i>
                        </a>                       
                        {post.likes}
                    </span>
                </p>

                <p>{preview? trucateWords(post.post.content, WORD_LIMIT) : post.post.content }</p>             

                {preview && <button className="button is-primary has-text-white is-small">
                    <span className="icon mr-1">
                       <i className="fas fa-angle-double-right"></i>
                    </span>
                    Continue reading
                </button>}                
                
            </div>

        </div>

        {!preview && <section className="is-flex is-flex-direction-column is-justity-content-start">
            {
                post.comments.map((c,i)=>{ return <Comment key={i} comment={c} currentUserId={user.userId}/>})
            }
        </section>} 

        {!preview&&<button className="button is-primary has-text-white mt-4 is-small" onClick={()=>comment()}>Comment</button>}    

    </article>
    );
}   