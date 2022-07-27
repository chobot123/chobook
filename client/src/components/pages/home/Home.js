import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ListedPost from "../../utility/listed_post/ListedPost";
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
        <Container>
            <div className="wrapper">
                <div className="title h4 b2">Home</div>
            </div>
            <div className="tweet">
                <CreatePost />
            </div>
            <div className="post-container">
                {posts.map((post) => { 
                    return <ListedPost 
                                key={post.id} 
                                firstName={post.author.firstName}
                                lastName={post.author.lastName}
                                username={post.author.username}
                                text={post.content}
                                numLikes={post.numLikes}
                                numShares={post.numShares}
                                numReplies={post.numReplies}
                                image={image}
                            />
                })}
            </div>
        </Container>
    )
}

export default Home;