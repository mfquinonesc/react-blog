import { useNavigate } from "react-router";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

export default function NotFound(){

    const navigate = useNavigate();

    function NotFoundMessage(){
        return(
            <div className="box p-6 m-1">            
                <h1 className="is-size-2 mb-4 has-text-centered has-text-weight-bold has-text-primary">404</h1>

                <div className="level">
                    <p className="has-text-grey has-text-centered is-size-4">Oops! The page you're looking for doesn't exist.</p>
                </div>

                <div className="buttons is-centered pt-4">
                    <button className="button is-primary has-text-white" type="button" onClick={()=>navigate('/')} >Go back home</button>
                </div>
            </div>
        );
    }

    return <AuthLayout component={ NotFoundMessage }></AuthLayout>
}