import React from "react";
import { Container } from "react-bootstrap";
import CreatePost from "../posts/post_create/CreatePost";
import { Outlet } from "react-router-dom";
import "./Home.css";

const Home = ({posts, setPosts}) => {

    return (
        <Container fluid className="home">
            <div className="wrapper">
                <div className="title h4 b2">Home</div>
                <div className="tweet w-100">
                    <CreatePost setPosts={setPosts}/>
                </div>
                <Outlet context={[posts, setPosts]}/>
            </div>
        </Container>
    )
}

export default Home;