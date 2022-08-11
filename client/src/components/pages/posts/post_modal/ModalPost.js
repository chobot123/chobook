import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import ProfilePicture from "../../../utility/profilepicture_post/ProfilePicture";
import ReplyPost from "../post_create/ReplyPost";
import {IoCloseOutline} from "react-icons/io5";
import "./ModalPost.css";
import CreatePost from "../post_create/CreatePost";

const ModalPost = ({
    fullName,
    username,
    content,
    setShow,
    show,
    postId,
    setPosts,
    setReplyCount
}) => {

    const [connectorHeight, setConnectorHeight] = useState(0);

    const closeModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShow(false);
    }

    useEffect(() => {
        const contentHeight = document.querySelector(".md.content").offsetHeight;
        setConnectorHeight(contentHeight);
    }, [connectorHeight])

    const handlePropagation = (e) => {
        e.stopPropagation();
    }

    return (
        <div className="ModalPost"
            style={
                {
                    display: (show) ? "block" : "none"
                }
            }
        >
            <div className="background" onClick={(e) => closeModal(e)} />
            <Container fluid className="modal-container">
                <div className="wrapper" onClick={(e) => handlePropagation(e)}>
                    <Container className="exit-modal">
                        <div className="exit-btn">
                            <IoCloseOutline id="exit-modal-btn" onClick={(e) => closeModal(e)}/>
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
                    <CreatePost 
                        postId={postId} 
                        setPosts={setPosts} 
                        setShow={setShow}
                        setReplyCount={setReplyCount}
                    />
                </div>
            </Container>
        </div>
    )
}

export default ModalPost;