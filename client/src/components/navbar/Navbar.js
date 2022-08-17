import React from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {RiHome7Fill, RiMailFill, RiUser3Fill, RiBellFill, RiDoorOpenFill, RiBearSmileLine } from "react-icons/ri";
import "./Navbar.css";

const NavigationBar = (props) => {

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
                        props.setLoggedIn(false);
                        props.setUser("");
                    }
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    const handleNavigate = (url) => {
        navigate(url);
    }

    return (
        <Container className="navigation h-100 d-flex">
            <div className="wrapper">
                <div className="logo" onClick={() => handleNavigate("/home")}>
                    <div className="img-nav"><RiBearSmileLine /></div>
                </div>
                <div className="home" onClick={() => handleNavigate("/home")}>
                    <div className="img-nav"><RiHome7Fill alt="home icon"/></div> 
                    <div className="navbar-link d-none d-xl-block">Home</div>
                </div>
                <div className="messages" onClick={() => handleNavigate("/messages")}>
                    <div className="img-nav"><RiMailFill alt="messages icon"/></div> 
                    <div  className="navbar-link d-none d-xl-block">Messages</div>
                </div>
                <div className="profile" onClick={() => handleNavigate("/" + props.user.username)}>
                    <div className="img-nav"><RiUser3Fill alt="profile icon"/></div> 
                    <div  className="navbar-link d-none d-xl-block">Profile</div>
                </div>
                <div className="notifications" onClick={() => handleNavigate("/notications")}>
                    <div className="img-nav"><RiBellFill alt="notifications icon"/></div> 
                    <div  className="navbar-link d-none d-xl-block">Notifications</div>
                </div>
                <div className="logout" onClick={(e) => handleLogout(e)}>
                    <div className="img-nav"><RiDoorOpenFill alt="logout icon"/></div> 
                    <div className="navbar-link d-none d-xl-block">Log Out</div>
                </div>
            </div>
            
        </Container>
    )
}

export default NavigationBar;