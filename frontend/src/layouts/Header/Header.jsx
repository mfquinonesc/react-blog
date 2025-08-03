import MainLogo from "../../components/icons/MainLogo/MainLogo";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/UserContext";
import { toUpperFirst } from "../../utilities/utils";
import useAuthorization from "../../hooks/useAuthorization";

export default function Header({onEdit}) {

    const navigate  = useNavigate();
    const { logout, user } = useUser();
    const [isActive, setIsActive] = useState(false);
    const [searchField, setSearchField] = useState(false);
    const { admin } = useAuthorization(user);
   
    const signOut = () =>{
        logout();
        navigate('/login');
    }

    const toggle = ()=>{
        setIsActive(!isActive);
    }

    const toggleSearch =()=>{
        setSearchField(!searchField);
    }

    const open = ()=>{
        if(onEdit){
            onEdit(true);
        }            
    }   

    return (
        <header className="navbar is-fixed-top has-background-text-90">
            <div className="container">

                <div className="navbar-brand">
                    <a className="navbar-item pt-3">
                        <MainLogo width={"6rem"} />
                    </a>
                    <span className={`navbar-burger ${isActive ? "is-active" : "" }`} data-target="navbarMenuHeroC" onClick={()=> toggle()}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </div>

                <div id="navbarMenuHeroC" className={`navbar-menu ${isActive ? "is-active" : "" }`}>
                    <div className="navbar-end">

                        {searchField && <span className="navbar-item">
                            <div className="field has-addons">                                                                         
                                <p className="control  is-expanded has-icons-left is-small">
                                    <input className="input is-small is-primary" type="text" placeholder="Search"/>                                    
                                    <span className="icon is-small is-left has-text-primary">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                </p>
                                <p className="control is-small">
                                    <a className="button is-small is-primary" onClick={()=>toggleSearch()}>
                                        <span className="icon has-text-white">
                                            <i className="fa-solid fa-xmark"></i>
                                        </span>
                                    </a>
                                </p>
                            </div>                    
                        </span>}                          

                        {!searchField && <span className="navbar-item">                            
                            <a className="has-text-primary" onClick={()=>toggleSearch()}>
                                <span className="icon  mr-1">                                    
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </span>
                                Search
                            </a>
                        </span>}

                        {admin && <span className="navbar-item">
                            <a className="has-text-primary">
                                <span className="icon  mr-1">
                                    <i className="fa-solid fa-key"></i>
                                </span>
                                Admin
                            </a>
                        </span>}  
                        
                        <span className="navbar-item">
                            <a className="has-text-primary" onClick={()=> open() }>
                                <span className="icon  mr-1">
                                   <i className="fa-solid fa-circle-plus"></i>
                                </span>
                                New
                            </a>
                        </span>

                        <span className="navbar-item is-hoverable">
                            <a className="has-text-primary" style={{ border: 'none' }}>
                                <span className="icon mr-2">
                                    <i className="fa-solid fa-user"></i>
                                </span> 
                                { user && <>{`${toUpperFirst(user.name)} ${toUpperFirst(user.lastname)}`}</> }                         
                            </a>
                            <div className="navbar-dropdown">                          
                                <a className="navbar-item has-text-primary">
                                    <span className="icon has-text-primary">
                                        <i className="fa-solid fa-user-lock"></i>
                                    </span>
                                    Account
                                </a>                              
                                <a className="navbar-item has-text-primary"> 
                                    <span className="icon has-text-primary">
                                       <i className="fa-solid fa-gear"></i> 
                                    </span>
                                    Settings                                     
                                </a> 
                                <a className="navbar-item has-text-primary" onClick={()=> signOut()}>
                                    <span className="icon has-text-primary">
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    </span>
                                    Sign out
                                </a>
                            </div>
                        </span>  

                    </div>
                </div>
                
            </div>
        </header>
    );
}
