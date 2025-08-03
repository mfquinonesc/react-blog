export default function AuthLayout({ component:Component }){
    return (
        <section className="hero is-fullheight is-secundary">
            <div className="hero-body">
                <div className="container columns">              
                    <div className="column is-4 is-offset-4">
                        <Component></Component>
                    </div>                      
                </div>
            </div>           
        </section>
    );
}