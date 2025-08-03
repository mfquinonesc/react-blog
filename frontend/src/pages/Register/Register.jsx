import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Calendar from "../../components/Calendar/Calendar";
import authService from "../../services/authService";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import MainLogo from "../../components/icons/MainLogo/MainLogo";
import { toUpperFirst } from "../../utilities/utils";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    lastName: yup.string().required('Lastname is required'),
    email: yup.string().required('Email is required').email('Email is invalid'),
    birthday: yup.string().required('Birthday is required'),
    password: yup.string().required('Password is required').min(8, 'Password must have at least 8 characters'),
    confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password')], 'Passwords must match')
});

export default function Register() {
    
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [username, setUsername] = useState(null);

    const { register, handleSubmit, setValue, reset, setFocus, formState:{ errors, isValid } } = useForm({ resolver: yupResolver(schema), mode:'onBlur' });
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (errors.name) setFocus("name");
        else if (errors.lastName) setFocus("lastName");
        else if (errors.email) setFocus("email");
        else if (errors.birthday) setFocus("birthday");
        else if (errors.password) setFocus("password");
        else if (errors.confirmPassword) setFocus("confirmPassword");
    }, [errors, setFocus]);

    const setBirthday=(date)=>{
        if(date){
            const birthday = new Date(date.year, date.month, date.date);
            setValue('birthday', birthday.toISOString().slice(0, 10));     
        }   
    } 

    const submit = async (data) => {
        
        if(!isValid)
            return;    

        try {            
            setIsLoading(true);
            let user = { ...data, rolId: 2 };
            user.birthday = new Date(user.birthday);              
            const res = await authService.signup(user);

            if(res.data.status){               
                setUsername(`${toUpperFirst(res.data.user.name)} ${toUpperFirst(res.data.user.lastname)}`);
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
    }

    function Wellcome(){
        return(
            <div className="box p-6 m-1">            
                <h1 className="is-size-2 mb-4 has-text-centered has-text-weight-bold has-text-primary">Wellcome</h1>

                <div className="level">
                    <p className="has-text-grey has-text-centered is-size-4">{username} your account has been created</p>
                </div>

                <div className="buttons is-centered pt-4">
                    <button className="button is-primary has-text-white" type="button" onClick={()=>navigate('/')} >Login</button>
                </div>
            </div>
        );
    }

    function RegisterForm() {
        return (
            <form className="box" onSubmit={handleSubmit(submit)}>
                <fieldset disabled={isLoading}>

                    <div className="is-flex is-flex-direction-row is-justify-content-center my-3">
                        <div style={{ width: '30%' }}>
                            <MainLogo />
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-body">

                            <div className="field">
                                <label htmlFor="name" className="label has-text-grey is-size-7">Name</label>
                                <div className="control">
                                    <input id="name" type="text" className="input is-small" {...register('name')} />
                                </div>
                                <small className="has-text-left has-text-danger is-size-7">{errors.name?.message}</small>
                            </div>

                            <div className="field">
                                <label htmlFor="lastName" className="label has-text-grey is-size-7">Lastname</label>
                                <div className="control">
                                    <input id="lastName" type="text" className="input is-small" {...register('lastName')} />
                                </div>
                                <small className="has-text-left has-text-danger is-size-7">{errors.lastName?.message}</small>
                            </div>

                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="email" className="label has-text-grey is-size-7">Email</label>
                        <div className="control">
                            <input id="email" type="email" className="input is-small" {...register('email')} />
                        </div>
                        <small className="has-text-left has-text-danger is-size-7">{errors.email?.message}</small>
                    </div>

                    <div className="field">
                        <label htmlFor="birthday" className="label has-text-grey is-size-7">Birthday</label>
                        <div className="control">
                            <input id="birthday" type="text" className="input is-small" readOnly style={{ cursor: 'pointer' }} {...register('birthday')} onClick={() => setActive(true)} />
                            <Calendar active={active} onCancel={(a) => setActive(a)} onSelect={(d) => setBirthday(d)} />
                        </div>
                        <small className="has-text-left has-text-danger is-size-7">{errors.birthday?.message}</small>
                    </div>

                    <div className="field">
                        <label htmlFor="password" className="label has-text-grey is-size-7">Password</label>
                        <div className="control">
                            <input id="password" type="password" className="input is-small" {...register('password')} />
                        </div>
                        <small className="has-text-left has-text-danger is-size-7">{errors.password?.message}</small>
                    </div>

                    <div className="field">
                        <label htmlFor="confirmPassword" className="label has-text-grey is-size-7">Confirm password</label>
                        <div className="control">
                            <input id="confirmPassword" type="password" className="input is-small" {...register('confirmPassword')} />
                        </div>
                        <small className="has-text-left has-text-danger is-size-7">{errors.confirmPassword?.message}</small>
                    </div>

                    {message && (
                        <div className="field">
                            <p className="has-text-left has-text-danger is-size-7">{message}</p>
                        </div>
                    )}

                    <div className="buttons pt-4">
                        <button type="submit" className={`button is-primary is-fullwidth has-text-white is-small ${isLoading ? 'is-loading' : ''}`} disabled={!isValid || isLoading}>
                            Register
                        </button>
                    </div>

                    <div className="field">
                        <p className="has-text-centered has-text-grey is-size-7">
                            Already have an account?
                            <a className="has-text-primary has-text-weight-semibold" onClick={() => navigate("/login")}> Login</a>
                        </p>
                    </div>

                </fieldset>
            </form> 
        );
    }

    return <AuthLayout component={username? Wellcome: RegisterForm}></AuthLayout>;
}