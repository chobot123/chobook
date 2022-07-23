import React from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const NavigationBar = () => {

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();

        fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            response.json()
                .then((data) => {
                    if(data.success){
                        navigate("/");
                    }
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    return (
        <Container className="navigation h-100">
            <Link to="Home" className="home">Home</Link>
            <Link to="messages" className="messages">Messages</Link>
            <Link to="profile" className="profile">Profile</Link>
            <Link to="notications" className="notifications">Notifications</Link>
            <div className="logout" onClick={(e) => handleLogout(e)}>Log Out</div>
        </Container>
    )
}

export default NavigationBar;