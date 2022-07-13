import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";
import { checkLength, checkLowerCase, checkUpperCase, checkNumbers, checkSymbols } from "../login/verifyPassword";
import "./Signup.css";

const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isValidLength, setIsValidLength] = useState(false);
    const [hasLowerCase, setHasLowerCase] = useState(false);
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasNumber, sethasNumber] = useState(false);
    const [hasSymbol, setHasSymbol] = useState(false);

    const [signupStatus, setSignupStatus] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        //signup api
        fetch("/api/auth/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password,
            }),
        })
        .then((response) => {
            response.json()
                .then((data) => {
                    if(data.success) {
                        return navigate("/");
                    }else {
                        setSignupStatus(false);
                        setMessage(data.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <Container className="auth signup pb-5">
            <div className="wrapper p-5">
                <div className="h1 auth header pb-3">Chobook</div>

                <div className="auth error-container" style={
                    {
                        display: (signupStatus) ? "none" : "flex"
                    }
                }>
                    <ul>
                        <li className="auth error-message">
                            <div className="bi bi-x-octagon" />
                            <div className="message">{message}</div>
                        </li>
                    </ul>
                </div>

                <Form className="auth form" onSubmit={(e) => handleSignup(e)}>
                    <Form.Group className="auth firstName mt-3">
                        <Form.Label className="auth label">First Name</Form.Label>
                        <Form.Control className="auth" 
                                      type="text"
                                      onChange={(e) => setFirstName(e.target.value)} 
                                      />
                    </Form.Group>

                    <Form.Group className="auth lastName mt-3">
                        <Form.Label className="auth label">Last Name</Form.Label>
                        <Form.Control className="auth" 
                                      type="text" 
                                      onChange={(e) => setLastName(e.target.value)}
                                      />
                    </Form.Group>

                    <Form.Group className="auth username mt-3">
                        <Form.Label className="auth label"> Username</Form.Label>
                        <Form.Control className="auth" 
                                      type="text" 
                                      onChange={(e) => setUsername(e.target.value)}
                                      />
                    </Form.Group>

                    <Form.Group className="auth password mt-3">
                        <Form.Label className="auth label">Password</Form.Label>
                        <Form.Control className="auth" 
                                      type="password" 
                                      onChange={(e) => {
                                        setPassword(e.target.value)
                                        setIsValidLength(checkLength(e.target.value))
                                        setHasLowerCase(checkLowerCase(e.target.value))
                                        setHasUpperCase(checkUpperCase(e.target.value))
                                        sethasNumber(checkNumbers(e.target.value))
                                        setHasSymbol(checkSymbols(e.target.value))
                                      }}
                                      />
                        
                        <Form.Text className="text-muted">
                            <ul className="auth checklist">
                                <span className="auth checklist-description">Your password must have:</span>

                                <li className="auth error" 
                                    id="badLength"
                                    style={
                                        {
                                            color: (isValidLength) ? "green" : "",
                                        }
                                    }
                                >Atleast 8 Characters</li>

                                <li className="auth error" 
                                    id="badLowerCase"
                                    style={
                                        {
                                            color: (hasLowerCase) ? "green" : "",
                                        }
                                    }
                                >{"A Lowercase Letter (a,b,c,...)"}</li>

                                <li className="auth error" 
                                    id="badUpperCase"
                                    style={
                                        {
                                            color: (hasUpperCase) ? "green" : "",
                                        }
                                    }
                                >{"An Uppercase Letter (A,B,C,..."}</li>

                                <li className="auth error" 
                                    id="badNumber"
                                    style={
                                        {
                                            color: (hasNumber) ? "green" : "",
                                        }
                                    }
                                >{"A Number (0,1,2,...)"}</li>

                                <li className="auth error" 
                                    id="badSymbol"
                                    style={
                                        {
                                            color: (hasSymbol) ? "green" : "",
                                        }
                                    }
                                >{"A Symbol (!,@,#,...)"}</li>

                            </ul>
                        </Form.Text>
                    </Form.Group>

                    <Button className="auth submit mt-4 w-100" variant="primary" type="submit">Sign Up</Button>
                </Form>

                <div className="auth redirect mt-3">
                    <span className="message">Already have an account?
                        <Link className="auth link" to="/">Log In</Link>
                    </span>
                </div>
            </div>
        </Container>
    )
}   

export default Signup;