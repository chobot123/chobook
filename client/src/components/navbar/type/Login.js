import React from "react";
import Nav from "react-bootstrap/Nav";

const Login = () => {

    const components = ["Home",
                        "Signup",
                        "Signin"]
    
    return (
        <>
            {components.map((el, index) => {
               return <Nav.Link href={`#${el}`} key={index}>{el}</Nav.Link>
            })}
        </>
    )
}

export default Login;