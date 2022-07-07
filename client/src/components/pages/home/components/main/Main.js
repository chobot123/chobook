import React from "react";
import Col from "react-bootstrap/Col";
import Posts from "./components/Posts";
import UserPost from "./components/UserPost";
import "./Main.css";

const Main = () => {

    return (
        <Col className="main">
            <div className="header p-card">Home</div>
            <div className="wrapper">
               <UserPost />
               <Posts />
            </div>
        </Col>
    )
}

export default Main;