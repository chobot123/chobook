import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { NavLink, Route, Routes, useParams } from "react-router-dom";
import Posts from "../posts/Posts";
import image from "./placeholder.jpg";
import "./Profile.css";

const Profile = () => {

    const [user, setUser] = useState("");
    let { username } = useParams();
    
    let activeStyle = {
        textDecoration: "underline",
    }

    let activeClassName = "underline";

    useEffect(() => {
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
                    console.log(data);
                    if(data.success){
                        setUser(data.user);
                    }
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <Container fluid>
            <div className="wrapper">
                <div className="header">
                    <div className="title h5 b2 mb-0">{user.firstName + " " + user.lastName}</div>
                    <div className="num-posts text-muted">{user.numPosts} {(user.numPosts > 1) ? "Posts" : "Post"}</div>
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
                                <div className="count pe-1" style={ {color: "white"}}>0</div>
                                Following
                            </div>
                            <div className="followers text-muted">
                                <div className="count pe-1" style={ {color: "white"}}>0</div>
                                Followers
                            </div>
                        </div>
                    </div>
                </div>
                
                <Container fluid className="tweets w-100">
                    <Row className="links">

                        <Col>
                            <NavLink
                                to=""
                                className={({ isActive}) => 
                                    isActive ? activeStyle : undefined
                                }
                            >
                                Tweets
                            </NavLink>
                        </Col>            

                        <Col>
                            <NavLink
                                to="with_replies"
                                className={({ isActive}) => 
                                    isActive ? activeStyle : undefined
                                }
                            >
                                Tweets & replies
                            </NavLink>
                        </Col>

                        <Col>
                            <NavLink
                                to="likes"
                                className={({ isActive}) => 
                                    isActive ? activeStyle : undefined
                                }
                            >
                                Likes
                            </NavLink>
                        </Col>
                    </Row>
                </Container>

                <Container fluid className="selected">
                    <Routes>
                        <Route path="/" element={<Posts username={username}/>} />
                        {/* <Route path="/with_replies" element={<WithReplies />} />
                        <Route path="/likes" element={<Likes />} /> */}
                    </Routes>
                </Container>
            </div>
        </Container>
    )
}

export default Profile;