import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { NavLink, Outlet, Route, Routes, useParams } from "react-router-dom";
import image from "./placeholder.jpg";
import PostsHandler from "./PostsHandler";
import "./Profile.css";

const Profile = () => {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [selector, setSelector] = useState("posts");

    let { username } = useParams();

    const postsActive = () => {
        setSelector("posts");
    }

    const repliesActive = () => {
        setSelector("replies")
    }

    const sharesActive = () => {
        setSelector("shares")
    }

    const likesActive = () => {
        setSelector("likes")
    }

    useEffect(() => {

        setLoading(true);

        fetch("/api/users/username/" + username,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            response.json()
                .then((data) => {
                    if(data.success){
                        setUser(data.user);
                    }
                    setLoading(false);
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        //posts, replies, shares, likes

        if(selector === "posts"){
            fetch("/api/posts/" + username + "/posts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if(data.success && data.posts) {
                            setPosts(data.posts);
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }

        if(selector === "replies"){
            fetch("/api/posts/" + username + "/posts/replies", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if(data.success && data.posts) {
                            setPosts(data.posts);
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }

        if(selector === "shares"){
            fetch("/api/posts/" + username + "/posts/shares", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if(data.success && data.posts) {
                            setPosts(data.posts);
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }

        if(selector === "likes"){
            fetch("/api/posts/" + username + "/posts/likes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if(data.success && data.posts) {
                            setPosts(data.posts);
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }

    }, [selector])

    return (
        <Container fluid>
            {(loading) ? "" : 
            <div className="wrapper">
                <div className="header">
                    <div className="title h5 b2 mb-0">{user.firstName + " " + user.lastName}</div>
                    <div className="num-posts text-muted">{user.numPosts} {(user.numPosts === 1) ? "Post" : "Posts"}</div>
                </div>
                <div className="user-info">
                    <div className="profile-pic pb-2 pt-2">
                        <Image src={image} alt="profile picture" 
                                roundedCircle="true"
                                style={
                                    {
                                        height: "7.5rem",
                                        width: "7.5rem",
                                    }
                                }
                        />
                    </div>
                    <div className="user">
                        <div className="name">{user.firstName + " " + user.lastName}</div>
                        <div className="username text-muted">@{user.username}</div>
                        <div className="createdAt text-muted pb-2 pt-2">Joined July 2022</div>
                        <div className="follows">
                            <div className="following text-muted me-4">
                                <div className="count pe-1" style={ {color: "white"}}>{user.numFollowing}</div>
                                Following
                            </div>
                            <div className="followers text-muted">
                                <div className="count pe-1" style={ {color: "white"}}>{user.numFollowers}</div>
                                Followers
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="PostsHandler w-100">
                    <Container fluid className="tweets w-100 ">
                
                        <Row className="links">

                            <Col>
                                <NavLink
                                    to=""
                                    className={({isActive}) => 
                                        isActive ? "active" : undefined
                                    }
                                    onClick={() => postsActive}
                                    end
                                >
                                    Tweets
                                </NavLink>
                            </Col>

                            <Col xs="auto">
                                <NavLink
                                    to="with_replies"
                                    className={({ isActive}) => 
                                        isActive ? "active" : undefined
                                    }
                                    onClick={() => repliesActive}
                                >
                                    Tweets & replies
                                </NavLink>
                            </Col>

                            <Col>
                                <NavLink
                                    to="shares"
                                    className={({ isActive}) => 
                                        isActive ? "active" : undefined
                                    }
                                    onClick={() => sharesActive}
                                >
                                    Shares
                                </NavLink>
                            </Col>

                            <Col>
                                <NavLink
                                    to="likes"
                                    className={({ isActive}) => 
                                        isActive ? "active" : undefined
                                    }
                                    onClick={() => likesActive}
                                >
                                    Likes
                                </NavLink>
                            </Col>        

                        </Row>

                    </Container>

                    <Container fluid className="selected">
                            <Outlet context={[username, posts, setPosts]}/>
                    </Container>

                </div>
            </div>
            }
        </Container>
    )
}

export default Profile;