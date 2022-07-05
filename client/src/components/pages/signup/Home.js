import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./Home.css";

const Signup = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const addPlaceholder = (placeholder, input) => {

        placeholder.classList.add("placeholder-top");
        input.classList.add("has-input");

    }

    const remPlaceholder = (placeholder, input) => {

        placeholder.classList.remove("placeholder-top");
        input.classList.remove("has-input");
        
    }

    useEffect(() => {

        const userPlaceholder = document.getElementById("user-login-placeholder");
        const userInput = document.getElementById("user-login");

        (username.length > 0) ? addPlaceholder(userPlaceholder, userInput) 
                                : remPlaceholder(userPlaceholder, userInput);

    }, [username])

    useEffect(() => {

        const passPlaceholder = document.getElementById("pass-login-placeholder");
        const passInput = document.getElementById("pass-login");

        (password.length > 0) ? addPlaceholder(passPlaceholder, passInput) 
                                : remPlaceholder(passPlaceholder, passInput);

    }, [password])

    return (
        <Container fluid className="h-100">
            <Row className="row h-100">
                <Col className="logo"></Col>
                <Col className="login d-flex justify-content-center align-items-center flex-column">
                    <Container className="form-wrapper">
                        <div className="title display-5">Chobook</div>
                        <Form className="form">
                            <Form.Group className="username">
                                <Form.Label className="wrapper w-100">
                                    <span className="text-muted" id="user-login-placeholder">Phone number, username, or email</span>
                                    <Form.Control type="text" id="user-login" name="username" onChange={(e) => setUsername(e.target.value)}></Form.Control>
                                </Form.Label>
                            </Form.Group>
                            <Form.Group className="password">
                                <Form.Label className="wrapper w-100">
                                    <span className="text-muted placeholder-top" id="pass-login-placeholder">Password</span>
                                    <Form.Control type="text" id="pass-login" name="password" onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                                </Form.Label>
                            </Form.Group>
                            <button className="submit w-100" type="submit">Log In</button>
                        </Form>
                        <div className="divider text-muted w-100">
                            <div className="line">_______________</div>
                            <div className="txt">OR</div>
                            <div className="line">_______________</div>
                        </div>
                        <div className="alt-login">LOGIN WITH FACEBOOK</div>
                        <div className="errors">ERRORS</div>
                    </Container>
                    <Container className="signup-wrapper">
                        Don't have an account?
                        <span className="signup-link">Sign up</span>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup;