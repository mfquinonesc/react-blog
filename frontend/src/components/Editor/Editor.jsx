import "./Editor.css"
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; 
import * as yup from "yup";
import postService from "../../services/postService";
import categoryService from "../../services/categoryService";
import { useUser } from "../../contexts/UserContext";

export default function Editor({open=false, comment=false, onClose}){

    const schema = yup.object().shape({
        title: yup.string().when([], {
            is: () => comment,
            then: (schema) => schema.strip(),
            otherwise: (schema) => schema.required("Title is required"),
        }),
        content: yup.string().required("Content is required"),
        category: yup.number().when([], {
            is: () => comment,
            then: (schema) => schema.strip(),
            otherwise: (schema) => schema.min(1, "Category is required"),
        }),
    });

    const { register, handleSubmit, reset, setFocus, formState: { errors, isValid } } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });
    const [minimized, setMinimized] = useState(false);
    const [maximized, setMaximized] = useState(false);
    const [opened, setOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const { user } = useUser(); 

    useEffect(()=>{
        const getCategories = async () => {
            const res = await categoryService.getAll();
            console.log(res.data.categories);
            setCategories(res?.data?.categories ?? []);
        } 
        getCategories();
    },[]);

    useEffect(()=>{
        if(open){
            setMinimized(false);
            setMaximized(false);            
        }
        setOpened(open);
    },[open]);

    const close = ()=>{
        if(onClose){
            onClose(false);
            setOpened(false);
            setMinimized(false);
            setMaximized(false);              
        }
    }

    const minimize =()=>{
        setMaximized(false);
        setMinimized(true);
    }

    const resize = () => {
      if (minimized || maximized) {
        setMinimized(false);
        setMaximized(false);
        return;
      }

      if (!minimized && !maximized) {
        setMaximized(true);
        return;
      }
    }   

    const submit = async(data)=>{

        console.log(data);
        
        if(data && !isValid){
            return;
        }

        try{
            const res = await postService.create({
                userId: user.userId,
                title: data.title,
                content: data.content,
                categoryIds: [data.category]
            });
            console.log(res);            
        }             
        catch(err){

        }
        finally{

        }        
    }

    return(
    <section className={`editor-component ${minimized?'editor-minimized':''} ${maximized?'editor-maximized':''} ${!opened?'editor-opened':''}`}>

        <div className="editor-component-container">

            <div className="editor-component-title-bar">

                <h2 className="has-text-primary has-text-weight-semibold">{comment?'New Comment':'New Post'}</h2>

                <p className="has-text-primary">

                    {!minimized&&<>
                        <a className="icon ml-1 has-text-primary" onClick={()=>minimize()}>
                            <i className="fa-solid fa-minus"></i>
                        </a>                    
                    </>}                 

                    <a className="icon ml-1 has-text-primary" onClick={()=>resize()}>

                        {!maximized&&<i className="fa-solid fa-up-right-and-down-left-from-center"></i>}

                        {maximized&&!minimized&&<i className="fa-solid fa-down-left-and-up-right-to-center"></i>}

                    </a>

                    <a className="icon ml-1 has-text-primary" onClick={()=>close()}>
                        <i className="fa-solid fa-xmark"></i>
                    </a>

                </p>

            </div>
            <form className="editor-component-content" onSubmit={handleSubmit(submit)}>

                {!comment&&<div className="field">
                    <label className="label has-text-grey is-small">Title</label>
                    <div className="control">
                        <input className="input is-small"  { ...register('title')} type="text" placeholder="Title"/>
                    </div>
                    <small className="has-text-left has-text-danger is-size-7">{errors.title?.message}</small>
                </div>}
                
                <div className="field">
                    <label className="label has-text-grey is-small">Content</label>
                    <div className="control">
                        <textarea className="textarea is-small" { ...register('content') } placeholder="Content"></textarea>
                    </div>
                    <small className="has-text-left has-text-danger is-size-7">{errors.content?.message}</small>
                </div>

                <div className="field">
                    <label className="label has-text-grey is-small">Category</label>
                    <div className="control">
                        <div className="select is-small">
                            <select { ...register('category') }>
                                <option value={0}>Select a category</option>
                                {
                                    categories.map((c, ind) => { return <option key={ind} value={c.categoryId}>{c.name}</option> })
                                }                            
                            </select>
                        </div>
                    </div>
                    <small className="has-text-left has-text-danger is-size-7">{errors.category?.message}</small>
                </div>


                {!comment&&<>               
                    <div className="field mb-2">
                        <label className="label has-text-grey is-small">Images</label>
                    </div>

                    <div className="field has-addons">
                        <p className="control">
                            <a className="button is-small is-primary has-text-white">
                                <span className="icon mr-1">
                                    <i className="fa-solid fa-images"></i>
                                </span>
                                Add image
                            </a>
                        </p>
                        <p className="control  is-expanded">
                            <input className="input is-small" type="text" placeholder="Drag files here" />
                        </p>                   
                    </div>                
                </>}               
                
                <div className="buttons is-justify-content-flex-end mt-2">                    
                    <button className={`button is-small is-primary has-text-white has-text-weight-semibold ${isLoading? "is-loading":""}`} disabled={!isValid || isLoading}>Save</button>
                    <button className="button is-small has-background-text-90 has-text-primary has-text-weight-semibold">Cancel</button>
                </div>

            </form>

        </div>
          
    </section>
    );
}