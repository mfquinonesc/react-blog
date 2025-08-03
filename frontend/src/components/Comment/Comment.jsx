import "./Comment.css";
import { toUpperFirst, formatDate } from "../../utilities/utils";
import useAuthorization from "../../hooks/useAuthorization";

export default function Comment({ comment, user}) {

    const { edition } = useAuthorization(user, comment=comment);
    
    return (
    <article className="comment-component">
      <div>
        <figure className="media-left">
            <p className="image is-64x64">
            <img className="is-rounded" src="https://bulma.io/assets/images/placeholders/96x96.png" />
            </p>
        </figure>
        <div>
            <p className="has-text-primary has-text-weight-semibold">{`${toUpperFirst(comment.user.name)} ${toUpperFirst(comment.user.lastname)}`}</p>
            <p className="has-text-black has-text-weight-semibold">{comment.user.rol.name}</p>
            <p className="has-text-text has-text-weight-semibold">{formatDate(comment.createdAt)}</p>
        </div>
        <div>
            {edition&&<a className="icon mr-2 has-text-primary">
                <i className="fa-solid fa-pen-to-square"></i>
            </a>}
            {edition&&<a className="icon has-text-primary">
                <i className="fa-solid fa-trash-can"></i>
            </a>}
        </div>
      </div>
      <p>{comment.content}</p>
    </article>
  );
}
