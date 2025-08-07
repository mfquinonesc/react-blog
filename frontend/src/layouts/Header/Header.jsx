import MainLogo from "../../components/icons/MainLogo/MainLogo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/UserContext";
import { toUpperFirst } from "../../utilities/utils";
import useAuthorization from "../../hooks/useAuthorization";
import { getIsMobile } from "../../hooks/useScreenSize";
import Searcher from "../../components/Searcher/Searcher";

export default function Header({ onEdit, onSearch, onSearchActive, showButton = undefined }) {

    const navigate  = useNavigate();
    const { logout, user } = useUser();
    const [isActive, setIsActive] = useState(false);
    const [searchField, setSearchField] = useState(false);
    const { admin, edition } = useAuthorization(user);
    const [searchQuery,  setSearchQuery] = useState('');

    const isMobile = getIsMobile();
  
    useEffect(()=>{       
        onSearch?.(searchQuery);      
    },[searchQuery]);  

    useEffect(()=>{ 
        onSearchActive?.(isMobile && searchField);        
    }, [searchField]);
   
    useEffect(()=>{
       setSearchField(showButton ?? false);
    },[showButton])

    const signOut = () =>{
        logout();
        navigate('/login');
    }

    const toggleNavbar = ()=>{
        setIsActive(!isActive);
    }

    const toggleSearch =()=>{     
        setSearchQuery('');      
        setSearchField(!searchField);
        setIsActive(false);       
    }

    const openEditor = ()=>{
        if(onEdit){
            onEdit(true);
        }
        setIsActive(false);          
    }

    return (
        <header className="navbar is-fixed-top has-background-text-90">
            <div className="container">

                <div className="navbar-brand">
                    <a className="navbar-item pt-3" onClick={(e)=>navigate('/')}>
                        <MainLogo width={"6rem"} />
                    </a>
                    <span className={`navbar-burger ${isActive ? "is-active" : "" }`} data-target="navbarMenuHeroC" onClick={()=> toggleNavbar()}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </div>

                <div id="navbarMenuHeroC" className={`navbar-menu ${isActive ? "is-active" : "" }`}>
                    <div className="navbar-end">

                        {searchField && !isMobile && <span className="navbar-item">
                            <Searcher onChange={(q)=> setSearchQuery(q)}  onClose={(e)=>toggleSearch()} />                            
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
                        
                        {edition && <span className="navbar-item">
                            <a className="has-text-primary" onClick={()=> openEditor() }>
                                <span className="icon  mr-1">
                                   <i className="fa-solid fa-circle-plus"></i>
                                </span>
                                New
                            </a>
                        </span>}

                        <span className="navbar-item is-hoverable">
                            <a className="has-text-primary" style={{ border: 'none' }}>
                                <span className="icon mr-2">
                                    <i className="fa-solid fa-user"></i>
                                </span> 
                                { user && <>{`${toUpperFirst(user.name)} ${toUpperFirst(user.lastname)}`}</> }                         
                            </a>
                            <div className="navbar-dropdown">                          
                                <a className="navbar-item has-text-primary">
                                    <span className="icon has-text-primary mr-1">
                                        <i className="fa-solid fa-user-lock"></i>
                                    </span>
                                    Account
                                </a>                              
                                <a className="navbar-item has-text-primary"> 
                                    <span className="icon has-text-primary mr-1">
                                       <i className="fa-solid fa-gear"></i> 
                                    </span>
                                    Settings                                     
                                </a> 
                                <a className="navbar-item has-text-primary" onClick={()=> signOut()}>
                                    <span className="icon has-text-primary mr-1">
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
