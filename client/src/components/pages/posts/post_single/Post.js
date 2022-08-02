import React, { useEffect, useState } from "react";
import "./Post.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbBrandHipchat, TbRepeat } from "react-icons/tb";
import { Button, Form, Image } from "react-bootstrap";
import image from "./placeholder.jpg";

const Post = () => {

    const [postId, setPostId] = useState("62d21720bc70b021c5b09ade");
    const [userLiked, setUserLiked] = useState(false);
    const [userShared, setUserShared] = useState(false);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [content, setContent] = useState("");
    const [timeStamp, setTimeStamp] = useState("");
    const [likeCount, setLikeCount] = useState(0);
    const [replyCount, setReplyCount] = useState(0);
    const [sharesCount, setSharesCount] = useState(0);

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

                    const post = data.post;  

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
        <div className="post container">
            <div className="post author d-flex align-items-center">
                <Image src={image} alt="profile picture"  
                    roundedCircle="true"
                    style={
                        {
                            height: "48px",
                            width: "48px",
                        }
                    }
                />
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
            <div className="post content">{content}</div>
            <div className="post timestamp"></div>
            <div className="post status bt pt-2 pb-2">
                <div className="post #likes">{likeCount} Likes</div>
                <div className="post #shares">{sharesCount} Shares</div>
                <div className="post #replies">{replyCount} Replies</div>
            </div>
            <div className="post react bt bb">
                <div className="react-wrapper like" onClick={(e) => handleLike(e)}>
                    {(userLiked) ? <AiFillHeart style={ {color: "rgb(236, 0, 91)"}}/> : <AiOutlineHeart />}
                </div>
                <div className="react-wrapper">
                    <TbBrandHipchat />
                </div>
                <div className="react-wrapper share" onClick={(e) => handleShare(e)}>
                    <TbRepeat style={ { color: (userShared) ? "rgb(14, 94, 0)" : ""}}/>
                </div>
            </div>
            <div className="replies-container">

            </div>
            <div className="p-mod">
                <Form className="post create">
                    <Form.Group className="post content">
                        <Form.Control as="textarea" placeholder="Add another Post" />
                    </Form.Group>

                    <Button className="post submit" variant="primary" type="submit">Post</Button>
                </Form>
            </div>
        </div>
    )
}

export default Post;