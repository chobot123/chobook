import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ListedPost from "../posts/post_list/ListedPost";
import CreatePost from "../posts/post_create/CreatePost";
import image from "./placeholder.jpg";
import "./Home.css";

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/api/posts/",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            response.json()
            .then((data) => {
                console.log(data);
                if(data.success && data.posts) {
                    setPosts(data.posts);
                }
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <Container fluid>
            <div className="wrapper">
                <div className="title h4 b2">Home</div>
                <div className="tweet w-100">
                    <CreatePost setPosts={setPosts}/>
                </div>
                <div className="post-container w-100">
                    {(posts) ? posts.map((post) => { 
                        return <ListedPost 
                                    key={post.id} 
                                    post={post}
                                />
                    }): <></>}
                </div>
            </div>
        </Container>
    )
}

export default Home;