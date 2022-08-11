import React, { useEffect, useState } from "react";
import "./Post.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbBrandHipchat, TbRepeat } from "react-icons/tb";
import { Button, Container, Form, Image } from "react-bootstrap";
import image from "./placeholder.jpg";
import { Link, useParams } from "react-router-dom";
import ModalPost from "../post_modal/ModalPost";
import ListedPost from "../post_list/ListedPost";
import ProfilePicture from "../../../utility/profilepicture_post/ProfilePicture";

const Post = () => {

    const [userLiked, setUserLiked] = useState(false);
    const [userShared, setUserShared] = useState(false);
    const [replies, setReplies] = useState([]);
    const [replyChain, setReplyChain] = useState([]);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [content, setContent] = useState("");
    const [timeStamp, setTimeStamp] = useState("");
    const [likeCount, setLikeCount] = useState(0);
    const [replyCount, setReplyCount] = useState(0);
    const [sharesCount, setSharesCount] = useState(0);
    const [show, setShow] = useState(false);

    const postId = useParams().post;

    const openModal = (e) => {
        e.preventDefault();
        setShow(true);
    }

    const handleLike = (e) => {
        e.preventDefault();

        if(!userLiked) {
            fetch("/api/posts/update/like/" + postId,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                response.json()
                    .then((data) => {
                        setUserLiked(data.currentUser.userLiked)
                        setLikeCount(data.post.numLikes);
                    }
                )
            })
        }else {
            fetch("/api/posts/update/dislike/" + postId,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                response.json()
                    .then((data) => {

                        setUserLiked(data.currentUser.userLiked)
                        setLikeCount(data.post.numLikes);
                    }
                )
            })
        }
    }

    const handleShare = (e) => {
        e.preventDefault();

        if(!userShared) {
            fetch("/api/posts/update/share/" + postId,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                response.json()
                    .then((data) => {
                        console.log(data);
                        setUserShared(data.currentUser.userShared)
                        setSharesCount(data.post.numShares);
                    }
                )
            })
        }else {
            fetch("/api/posts/update/unshare/" + postId,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                response.json()
                    .then((data) => {
                        console.log(data);
                        setUserShared(data.currentUser.userShared)
                        setSharesCount(data.post.numShares);
                    }
                )
            })
        }
    }

    useEffect(() => {

        fetch("/api/posts/" + postId,
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
                    const post = data.post;  
                    if(post.replies){
                        setReplies(post.replies);
                    }

                    if(post.replyChain) {
                        setReplyChain(post.replyChain);
                    }
                    setUsername(post.author.username);
                    setFullName(post.author.firstName + " " + post.author.lastName);
                    setContent(post.content);
                    setTimeStamp(post.createdAt);
                    setLikeCount(post.numLikes);
                    setReplyCount(post.numReplies);
                    setSharesCount(post.numShares);

                    setUserLiked(data.currentUser.userLiked);
                    setUserShared(data.currentUser.userShared);
                    
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <Container fluid>
            <div className="wrapper">
                <Container fluid className="replyChain">
                    {(replyChain) ? replyChain.map((reply) => {
                        return  <div className="w-100"
                                    key={reply.id}
                                >
                                    <ListedPost
                                        post={reply}
                                    />
                                </div>
                    }) : <></>}
                </Container>
                <Container fluid className="post pt-2">
                    <div className="post author d-flex align-items-center p-1">
                        <ProfilePicture />
                        <div className="post author-info">
                            <div className="post fullName">{fullName}</div>
                            <div className="post username text-muted"
                                style={
                                    {
                                        lineHeight: 1,
                                    }
                                }
                            >@{username}</div>
                        </div>
                    </div>
                    <div className="post content pt-4 pb-2">{content}</div>
                    <div className="post timestamp"></div>
                    <div className="post status bt pt-2 pb-2">
                        <div className="post likes">
                            <div className="counter pe-1">{likeCount}</div>
                            <div className="label text-muted">Likes</div>
                        </div>
                        <div className="post shares">
                            <div className="counter pe-1">{sharesCount}</div>
                            <div className="label text-muted">Shares</div>
                        </div>
                        <div className="post replies">
                            <div className="counter pe-1">{replyCount}</div>
                            <div className="label text-muted">Replies</div>
                        </div>
                    </div>
                    <div className="post react bt bb pt-2 pb-2">
                    <div className="replies">
                            <div className="replies-wrapper" onClick={(e) => openModal(e)}>
                                <div className="icon-wrapper replies">
                                    <TbBrandHipchat />
                                </div>
                            </div>
                        </div>

                        <div className="shares">
                            <div className="shares-wrapper" onClick={(e) => handleShare(e)}>
                                <div className="icon-wrapper shares">
                                    <TbRepeat style={ {color: (userShared) ? "rgb(14, 94, 0)" : "" }} />
                                </div>
                            </div>
                            
                        </div>

                        <div className="likes">
                            <div className="likes-wrapper" onClick={(e) => handleLike(e)}>
                                <div className="icon-wrapper likes">
                                    {(userLiked) ? <AiFillHeart style={ {color: "rgb(236, 0, 90)"}}/> : <AiOutlineHeart />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Container fluid className="p-mod d-flex w-100 p-1 pb-2 bb">
                        <ProfilePicture />
                        <Form className="post create w-100">
                            <Form.Label className="form-control text-muted reply-to">
                                {"Replying to "}
                                <Link
                                    to={"/" + username}
                                >
                                    @{username}
                                </Link>
                            </Form.Label>
                            <Form.Group className="post content">
                                <Form.Control as="textarea" placeholder="Add another Post" />
                            </Form.Group>

                            <Button className="post submit" variant="primary" type="submit">Post</Button>
                        </Form>
                    </Container>
                    <div className="replies-container">
                        {(replies) ? replies.map((reply) => {
                            return <ListedPost
                                        key={reply.id}
                                        post={reply}
                                        setPosts={setReplies}
                                   />
                        }) : <></>}
                    </div>
                </Container>
            </div>
            <ModalPost fullName={fullName} 
                       username={username} 
                       content={content} 
                       setShow={setShow} 
                       show={show} 
                       postId={postId}
                       setPosts={setReplies}
            />
        </Container>
    )
}

export default Post;