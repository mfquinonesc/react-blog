import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import MainLogo from "../components/icons/MainLogo/MainLogo";
import "./Guard.css";

export default function Guard({ element:page }) {

  const [isAuthorized, setIsAuthorized] = useState(null); 

  useEffect(() => {   
    verify();            
  }, []);   

  const verify = async () => {
    try {
      const res = await authService.verify();           
      setIsAuthorized(res.data.loggedIn);
    } catch (err) {
      setIsAuthorized(false);
    }
  };

  function WaitOverlay() {
    return (
      <div className="box" style={{backgroundColor:'transparent', boxShadow:'none'}}>
        <div className="blog-guard-loader">       
          <MainLogo defaultColor={false}/>
        </div>
      </div>   
    );
  }

  if (isAuthorized === null) {
    return <AuthLayout component={ WaitOverlay }></AuthLayout>;
  }

  return isAuthorized ? page : <Navigate to="/login" />;
}
