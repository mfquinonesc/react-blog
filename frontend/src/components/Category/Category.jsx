import "./Category.css";
import BoxLayout from "../../layouts/BoxLayout/BoxLayout";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import categoryService from "../../services/categoryService";
import postService from "../../services/postService";

export default function Category() {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const getCategory = async () => {
            let result = await categoryService.getAll();
            const categoryList = result.data?.categories.sort((a, b) => a.name.localeCompare(b.name)) ?? [];

            result = await postService.getAll();
            const postList = result.data?.posts ?? [];

            const postCategories = categoryList.map(c => {
                const posts = postList.filter(p => { return p.categoriesList[0].categoryId == c.categoryId }).map(p => { return p.post });
                return { ...c, posts };
            });

            setCategories(postCategories);
        }

        getCategory();
    }, []);

    const toggle = (index) => {
        setCategories(categories.map((c, i) => { return i === index ? { ...c, isActive: !c.isActive } : c }));
    }

    const getCategory = () => {
        return <div className="category-component">
            <h2 className="title is-size-5 mb-3 has-text-primary has-text-weight-semibold">Categories</h2>
            {
                categories.map((c, indC) => {
                    return (<React.Fragment key={indC}>
                        <h3 className={c.isActive ? 'is-selected' : ''}>
                            <a className="has-text-primary has-text-weight-semibold" onClick={() => toggle(indC)}>{`${c.name} (${c.posts.length})`}</a>
                        </h3>
                        {
                            c.isActive && <ul> {
                                c.posts.map((p, indP) => {
                                    return <li key={indP} className="my-2">
                                        <a className="has-text-text has-text-weight-semibold" onClick={(e) => navigate(`/posts/${p.postId}`)}>{p.title}</a>
                                    </li>
                                })
                            }</ul>
                        }
                    </React.Fragment>)
                })
            }
        </div>
    }

    return <BoxLayout component={getCategory}></BoxLayout>

}