import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, Outlet, Route, Routes, useParams } from "react-router-dom";
import "./PostsHandler.css";

const PostsHandler = ({setSelector}) => {

    const postsActive = () => {
        setSelector("posts");
        return "active";
    }

    const repliesActive = () => {
        setSelector("replies")
        return "active";
    }

    const sharesActive = () => {
        setSelector("shares")
        return "active";
    }

    const likesActive = () => {
        setSelector("likes")
        return "active";
    }

    return (
        <div className="PostsHandler w-100">
            <Container fluid className="tweets w-100 ">
            
                <Row className="links">

                    <Col>
                        <NavLink
                            to=""
                            className={({isActive}) => 
                                isActive ? handlePost() : undefined
                            }
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
                        >
                            Likes
                        </NavLink>
                    </Col>        

                </Row>

            </Container>

            <Container fluid className="selected">
                    {
                        //username & posts
                    }
                    <Outlet />
            </Container>

        </div>
    )
}

export default PostsHandler;