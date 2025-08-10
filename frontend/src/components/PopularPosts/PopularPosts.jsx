import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SummaryInfo from "../SummaryInfo/SummaryInfo";
import BoxLayout from "../../layouts/BoxLayout/BoxLayout";
import postService from "../../services/postService";
import "./PopularPosts.css";

export default function PopularPosts() {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getPosts = async () => {
            const result = await postService.getAll();
            const list = result.data?.posts.sort((a, b) => b.likes - a.likes).slice(0, 3) ?? [];
            setPosts(list);
        }
        getPosts();
    }, []);


    const getLastPosts = () => {
        return (
            <div className="popular-posts-component">
                <h2 className="title is-size-5 mb-3 has-text-primary has-text-weight-semibold">Popular Posts</h2>
                {
                    posts.map((p, ind) => { return <SummaryInfo key={ind} title={p.post.title} date={p.post.createdAt} onClick={(e) => navigate(`/posts/${p.post.postId}`)} /> })
                }
            </div>
        )
    }

    return <BoxLayout component={getLastPosts}></BoxLayout>;
}