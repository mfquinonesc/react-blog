import "./Editor.css"
import { useState, useEffect } from "react";

export default function Editor({open=false, comment=false, onClose}){

    const [minimized, setMinimized] = useState(false);
    const [maximized, setMaximized] = useState(false);
    const [opened, setOpened] = useState(false);

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
            <div className="editor-component-content">

                {!comment&&<div className="field">
                    <label className="label has-text-grey is-small">Title</label>
                    <div className="control">
                        <input className="input is-small" type="text" placeholder="Title"/>
                    </div>
                </div>}
                
                <div className="field">
                    <label className="label has-text-grey is-small">Content</label>
                    <div className="control">
                        <textarea className="textarea is-small" placeholder="Content"></textarea>
                    </div>
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
                    <button className="button is-small is-primary has-text-white has-text-weight-semibold">Preview</button>
                    <button className="button is-small is-primary has-text-white has-text-weight-semibold">Save draft</button>
                    <button className="button is-small is-primary has-text-white has-text-weight-semibold">Publish</button>
                    <button className="button is-small has-background-text-90 has-text-primary has-text-weight-semibold">Cancel</button>
                </div>

            </div>

        </div>
          
    </section>
    );
}