import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import authService from "../../services/authService";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import MainLogo from "../../components/icons/MainLogo/MainLogo";
import { useUser } from "../../contexts/UserContext";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import icon_google from "../../assets/images/icon_google.png";

const schema = yup.object().shape({
  password: yup.string().required('Password is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),  
})

export default function Login() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const { register, handleSubmit, reset, setFocus, formState: { errors, isValid } } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });
  const navigate = useNavigate();
  const { login } = useUser(); 

  useEffect(() => {       
      if (errors.email) setFocus("email");       
      else if (errors.password) setFocus("password");       
  }, [errors, setFocus]);

  const submit = async (data = null) => {

    if(data && !isValid)
      return;      
   
    try {
      setIsLoading(true);
      const res = data? await authService.login({ ...data }): await authService.demo();

      if (res.data.status) {
        login(res.data.user, res.data.token);
        navigate("/");
        return;
      }     
        
      reset();
      setMessage(res.data.message);
    }
    catch (err) {
      reset();
      setMessage(err.response? "An unexpected error occurred" : "Could not connect to the server. Please try again later");
    }
    finally {
      setIsLoading(false);
    }
  };

  function LoginForm() {
    return (
      <form className="box" onSubmit={handleSubmit(submit)}>
        <fieldset disabled={isLoading}>

            <div className="is-flex is-flex-direction-row is-justify-content-center my-3">
                <div style={{ width: "30%" }}>
                    <MainLogo />
                </div>
            </div>

            <div className="field">
                <label htmlFor="email" className="label has-text-grey is-small">Email</label>
                <div className="control">
                    <input id="email" type="email" className="input is-small" {...register('email')} />
                </div>
                <small className="has-text-left has-text-danger is-size-7">{errors.email?.message}</small>
            </div>

            <div className="field">
                <label htmlFor="password" className="label has-text-grey is-small">Password</label>
                <div className="control">
                    <input id="password" type="password" className="input is-small" {...register('password')} />
                </div>
                <small className="has-text-left has-text-danger is-size-7">{errors.password?.message}</small>
            </div>

            {message && (
              <div className="field">
                  <small className="has-text-left has-text-danger is-size-7">{message}</small>
              </div>
            )}

            <div className="buttons pt-1">

                <button type="submit" className={`button is-primary is-fullwidth has-text-white is-small ${isLoading? "is-loading" : "" }`} disabled={!isValid || isLoading}>
                    Login
                </button>

                <button type="button" className={`button is-fullwidth is-outlined is-small mt-1 ${isLoading? "is-white" : "is-primary" }`}>
                  <span className="icon">
                    <img src={icon_google} alt="Google" />
                  </span>
                  <span className="has-text-primary has-text-weight-semibold ml-1">Sign in with Google</span>
                </button>

            </div>

            <div className="field">
                <p className="has-text-centered has-text-grey is-size-7">
                    Don't have an account?
                    <a className="has-text-primary has-text-weight-semibold pl-1" onClick={()=> navigate("/register")}>
                        Register
                    </a>
                </p>
            </div>

            <div className="field">
                <p className="has-text-centered is-size-7">
                    <a className="has-text-primary has-text-weight-semibold" onClick={()=> submit()}>
                        Demo
                    </a>
                </p>
            </div>

        </fieldset>
      </form>  
    );
  }

  return <AuthLayout component={LoginForm}></AuthLayout>;
}
