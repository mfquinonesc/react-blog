import { useEffect, useState } from "react";
import BoxLayout from "../../layouts/BoxLayout/BoxLayout";
import SummaryInfo from "../SummaryInfo/SummaryInfo";
import { formatDate } from "../../utilities/utils";
import postService from "../../services/postService";
import userService from "../../services/userService";


export default function AboutAuthor({ postId, authorId }) {

    const [author, setAuthor] = useState({});

    useEffect(() => {
        const getAuthor = async () => {
            let user = { userId: authorId ?? 0 }

            if (postId && !isNaN(Number(postId))) {
                const result = await postService.get(postId);
                user.userId = result.data.post[0]?.author.userId ?? 0;
            }

            if (user.userId) {
                const result = await userService.get(user.userId);
                user = { ...user, ...result.data.user };
            }
            setAuthor(user);
        }

        getAuthor();

    }, [postId, authorId]);

    const getAboutAuthor = () => {
        return (
            <div className="is-flex is-flex-direction-column is-justify-content-flex-start is-align-items-flex-start">
                <h2 className="title is-size-5 mb-3 has-text-primary has-text-weight-semibold">About the Author</h2>
                <SummaryInfo title={author.userId > 0 ? `${author.name} ${author.lastname}` : 'UnKnown'} subtitle={author.rol?.name ?? 'Unknown'} text={author.createdAt ? `Joined on ${formatDate(author.createdAt)}` : null} />
            </div>
        )
    }

    return <BoxLayout component={getAboutAuthor}></BoxLayout>
}