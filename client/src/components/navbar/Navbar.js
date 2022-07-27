import React from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {RiHome7Fill, RiMailFill, RiUser3Fill, RiBellFill, RiDoorOpenFill, RiBearSmileLine } from "react-icons/ri";
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
        <div className="navigation h-100">
            <div className="wrapper">
                <div className="logo">
                    <div className="img-nav"><RiBearSmileLine /></div>
                </div>
                <div className="home">
                    <div className="img-nav"><RiHome7Fill alt="home icon"/></div> 
                    <Link to="home" className="navbar-link">Home</Link>
                </div>
                <div className="messages">
                    <div className="img-nav"><RiMailFill alt="messages icon"/></div> 
                    <Link to="messages" className="navbar-link">Messages</Link>
                </div>
                <div className="profile">
                    <div className="img-nav"><RiUser3Fill alt="profile icon"/></div> 
                    <Link to="profile" className="navbar-link">Profile</Link>
                </div>
                <div className="notifications">
                    <div className="img-nav"><RiBellFill alt="notifications icon"/></div> 
                    <Link to="notications" className="navbar-link">Notifications</Link>
                </div>
                <div className="logout">
                    <div className="img-nav"><RiDoorOpenFill alt="logout icon"/></div> 
                    <Link to="logout" className="navbar-link">Log Out</Link>
                </div>
            </div>
            
        </div>
    )
}

export default NavigationBar;