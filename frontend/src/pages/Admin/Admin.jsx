import Footer from "../../layouts/Footer/Footer";
import Header from "../../layouts/Header/Header";
import TabBar from "../../components/TabBar/TabBar";
import TabLayout from "../../layouts/TabLayout/TabLayout";
import ListView from "../../components/ListView/ListView";
import { TabItems } from "../../hooks/useTabItems";
import { useState, useEffect } from "react";
import { formatText } from "../../utilities/utils";
import Loader from "../../components/Loader/Loader";
import userService from "../../services/userService";
import postService from "../../services/postService";
import categoryService from "../../services/categoryService";
import commentService from "../../services/commentService";


export default function Admin() {

    const labels = ['users', 'posts', 'comments', 'categories', 'rols'];
    const [tabs, setTabs] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const arr = new TabItems(labels).toArray();
        getItems(arr);
    }, []);

    const tabConfig = {
        users: {
            service: userService,
            key: "users",
            mapper: (u) => ({
                label: `${formatText(u.name + " " + u.lastname)} - ${u.email}`,
                id: u.userId,
                type: "users",
            })
        },
        posts: {
            service: postService,
            key: "posts",
            mapper: (p) => ({
                label: p.post.title,
                id: p.post.postId,
                type: "posts",
            })
        },
        categories: {
            service: categoryService,
            key: "categories",
            mapper: (c) => ({
                label: c.name,
                id: c.categoryId,
                type: "categories",
            })
        },
        comments:{
            service: commentService,
            key: "comments",
            mapper: (c) => ({               
                type: "comments",
            })
        }       
    };

    const getItems = async (arr) => {

        setTabs(arr);

        const activeTab = arr.find((t) => t.active);
        if (!activeTab) return;

        const config = tabConfig[activeTab.label];
        if (!config) return;

        try {
            setLoading(true);
            const res = await config.service.getAll();
            const data = res.data[config.key] || [];
            const list = data.map(config.mapper);
            setItems(list);
        }
        catch (error) {
            setItems([]);
        }
        finally {
            setLoading(false);
        }
    };

    const getList = () => {
        return loading ? (
            <div className="mt-5">
                <Loader />
            </div>
        ) : <ListView items={items} />
    }

    return <>
        <Header></Header>
        <section className="hero is-fullheight-with-navbar mt-6 pt-5">
            <div className="container columns">
                <main className="column is-12">

                    <TabBar labels={labels} onSelect={(arr) => getItems(arr)} />

                    <TabLayout active={true} component={() => getList()} />

                </main>
            </div>
        </section>
        <Footer></Footer>
    </>
}