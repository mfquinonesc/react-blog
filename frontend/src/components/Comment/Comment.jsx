import "./Comment.css";
import useAuthorization from "../../hooks/useAuthorization";
import SummaryInfo from "../SummaryInfo/SummaryInfo";
import ToolBar from "../ToolBar/ToolBar";

export default function Comment({ comment, user}) {

    const { edition } = useAuthorization(user, comment=comment);
    
    return (
    <article className="comment-component">
      <ToolBar position={{ top: '0.5rem', right: '0.5rem' }} />
      <SummaryInfo title={`${comment.author.name} ${comment.author.lastname}`} subtitle={comment.author?.rol?.name ?? 'Unknown'} date={comment.comment.createdAt}/>  
      <p>{comment.comment.content}</p>
    </article>
  );
}
