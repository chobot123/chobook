import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./Home.css";
import "./auth.css";

const Home = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        //login api
        fetch("/api/auth/login",
        {
            method: "POST",
            body: {
                username: username,
                password: password,
            }
        })
        .then((response) => {
            response.json().then(json => console.log(json))
        })
        .catch((error) => {
            console.log("error");
        })
        
    }


    return (
        <Container className="login pb-5">
            <div className="wrapper p-5">
                <div className="h1 auth header pb-3">Chobook</div>
                <Form className="auth form" onSubmit={(e) => handleSubmit(e)}>                
                    <Form.Group className="auth username mt-2">
                        <Form.Control className="auth" type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="auth password mt-2">
                        <Form.Control className="auth" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Button className="auth submit mt-2 w-100"variant="primary" type="submit">Log In</Button>
                </Form>
            </div>
        </Container>
    )
}

export default Home;