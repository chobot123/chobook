import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../auth/auth.css";
import "./Login.css";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(true);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        //login api
        fetch("/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            }),
        })
        .then((response) => {
            response.json()
                .then((data) => {
                    if(data.success) {
                        navigate("/home");
                    }else{
                        setLoginStatus(data.success);
                        setMessage(data.message);
                    }
                })
                .catch((err) => {console.log(err);})
        })
        .catch((err) => {
            console.log(err);
        })
        
    }

    useEffect(() => {
        console.log(loginStatus);
        console.log(message);
    }, [loginStatus, message])

    return (
        <Container className="auth login pb-5">
            <div className="wrapper p-5">
                <div className="h1 auth header pb-3">Chobook</div>

                <div className="auth error-container" style={
                    {
                        display: (loginStatus) ? "none" : "flex"
                    }
                }>
                    <ul>
                        <li className="auth error-message">
                            <div className="bi bi-x-octagon" />
                            <div className="message">{message}</div>
                        </li>
                    </ul>
                </div>

                <Form className="auth form" onSubmit={(e) => handleLogin(e)}>                
                    <Form.Group className="auth username mt-3">
                        <Form.Label className="auth label">Username</Form.Label>
                        <Form.Control className="auth" 
                                      type="text" 
                                      onChange={(e) => setUsername(e.target.value)}
                                      />
                    </Form.Group>

                    <Form.Group className="auth password mt-3">
                        <Form.Label className="auth label">Password</Form.Label>
                        <Form.Control className="auth" 
                                      type="password" 
                                      onChange={(e) => setPassword(e.target.value)}
                                      />
                    </Form.Group>

                    <Button className="auth submit mt-4 w-100" variant="primary" type="submit">Log In</Button>
                </Form>

                <div className="auth redirect mt-3">
                    <span className="message">Don't have an account?
                        <Link className="auth link" to="/signup">Sign up</Link>
                    </span>
                </div>
            </div>
        </Container>
    )
}

export default Login;