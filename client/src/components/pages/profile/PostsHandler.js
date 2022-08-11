import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import "./PostsHandler.css";

const PostsHandler = ({selector, setSelector, username, posts, setPosts}) => {

    const home = null;

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
                                isActive ? postsActive() : undefined
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
                                isActive ? repliesActive() : undefined
                            }
                        >
                            Tweets & replies
                        </NavLink>
                    </Col>

                    <Col>
                        <NavLink
                            to="shares"
                            className={({ isActive}) => 
                                isActive ? sharesActive() : undefined
                            }
                        >
                            Shares
                        </NavLink>
                    </Col>

                    <Col>
                        <NavLink
                            to="likes"
                            className={({ isActive}) => 
                                isActive ? likesActive() : undefined
                            }
                        >
                            Likes
                        </NavLink>
                    </Col>        

                </Row>

            </Container>

            <Container fluid className="selected">
                    <Outlet context={[username, home, posts, setPosts]}/>
            </Container>

        </div>
    )
}

export default PostsHandler;