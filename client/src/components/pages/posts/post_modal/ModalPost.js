import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import ProfilePicture from "../../../utility/profilepicture_post/ProfilePicture";
import ReplyPost from "../post_create/ReplyPost";
import {IoCloseOutline} from "react-icons/io5";
import "./ModalPost.css";

const ModalPost = ({
    fullName,
    username,
    content,
    setShow,
    show,
    postId,
    setPosts
}) => {

    const [connectorHeight, setConnectorHeight] = useState(0);

    useEffect(() => {
        const contentHeight = document.querySelector(".md.content").offsetHeight;
        setConnectorHeight(contentHeight);
    }, [connectorHeight])

    const handleButton = (e) => {
        e.preventDefault();
        setShow(false);
    }

    const handleBackground = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(e.target);
        if(e.target.className ==="ModalPost") {
            setShow(false);
        }
    }

    return (
        <div className="ModalPost"
            style={
                {
                    display: (show) ? "block" : "none"
                }
            }

            onClick={(e) => handleBackground(e)}
        >
            <Container fluid className="modal-container">
                <div className="wrapper">
                    <Container className="exit-modal">
                        <div className="exit-btn">
                            <IoCloseOutline id="exit-modal-btn" onClick={(e) => handleButton(e)}/>
                        </div>
                    </Container>
                    <Container className="replyTo p-1">
                        <ProfilePicture />
                        <div className="md post-info ps-2">
                            <div className="md user-info">
                                <div className="md fullName pe-1">{fullName}</div>
                                <div className="md username text-muted">@{username}</div>
                            </div>
                            <div className="md content">{content}</div>
                        </div>
                    </Container>
                    <div className="connector" style={
                        {
                            height: connectorHeight,
                        }
                    }/>
                    <ReplyPost postId={postId} setPosts={setPosts}/>
                </div>
            </Container>
        </div>
    )
}

export default ModalPost;