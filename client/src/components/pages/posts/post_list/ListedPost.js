import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import ProfilePicture from "../../../utility/profilepicture_post/ProfilePicture";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbBrandHipchat, TbRepeat } from "react-icons/tb";
import ModalPost from "../post_modal/ModalPost";
import "./ListedPost.css";
import { Link, useNavigate } from "react-router-dom";

const ListedPost = ({
    post, 
    setPosts,
    isReplying,
    hasReply,
}) => {

    const [userLiked, setUserLiked] = useState(false);
    const [replyTo, setReplyTo] = useState("");
    const [userShared, setUserShared] = useState(false);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [content, setContent] = useState("");
    const [timeStamp, setTimeStamp] = useState("");
    const [likeCount, setLikeCount] = useState(0);
    const [replyCount, setReplyCount] = useState(0);
    const [shareCount, setShareCount] = useState(0);
    const [show, setShow] = useState(false);
    const [postHeight, setPostHeight] = useState(0);

    const [loading, setLoading] = useState(true);

    const ref = useRef(null);
    
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        e.preventDefault();
        navigate("/" + username + "/status/" + post.id);
    }

    const openModal = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setShow(true);
    }

    const handlePropagation = (e) => {
        e.stopPropagation();
    }

    const handleLike = (e) => {

        e.stopPropagation();
        e.preventDefault();

        if(!userLiked) {
            fetch("/api/posts/update/like/" + post.id,
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
                        setLikeCount(likeCount + 1);
                    }
                )
            })
        }else {
            fetch("/api/posts/update/dislike/" + post.id,
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
                        setLikeCount(likeCount - 1);
                    }
                )
            })
        }
    }

    const handleShare = (e) => {

        e.stopPropagation();
        e.preventDefault();

        if(!userShared) {
            fetch("/api/posts/update/share/" + post.id,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                response.json()
                    .then((data) => {
                        setUserShared(data.currentUser.userShared)
                        setShareCount(data.post.numShares);
                    }
                )
            })
        }else {
            fetch("/api/posts/update/unshare/" + post.id,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                response.json()
                    .then((data) => {
                        setUserShared(data.currentUser.userShared)
                        setShareCount(data.post.numShares);
                    }
                )
            })
        }
    }

    useEffect(() => {

        let ignore = false;

        setLoading(true);

        fetch("/api/posts/" + post.id, 
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            response.json()
            .then((data) => {

                if(!ignore) {
                    if(data.success) {  
                        if(data.post.replyTo) {
                            setReplyTo(data.post.replyTo.author.username);
                        }

                        setUsername(data.post.author.username);
                        setFullName(data.post.author.firstName + " " + data.post.author.lastName);
                        setContent(data.post.content);
                        setTimeStamp(data.post.createdAt);
                        setLikeCount(data.post.numLikes);
                        setReplyCount(data.post.numReplies);
                        setShareCount(data.post.numShares);
                        setUserLiked(data.currentUser.userLiked);
                        setUserShared(data.currentUser.userShared);
                    }

                    setLoading(false);
                }
                
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

        setPostHeight(ref.current.offsetHeight);

        return () => {
            ignore = true;
        }

    }, [post])

    return (
        <Container fluid 
            className="ListedPost w-100 p-1 pb-2"
            onClick={(e) => {handleNavigate(e)}}
            ref={ref}
            style={
                {
                    borderBottom:  (hasReply || isReplying) ? "none" : "1px solid rgba(202, 202, 202, 0.15)",
                    display: (loading) ? "none" : "flex",
                }
            }
        >
            <ProfilePicture 
                isReplying={isReplying}
                hasReply={hasReply}
                postHeight={postHeight}
            />
            <div className="info w-100">

                <div className="user">
                    <div className="name">
                        {fullName}
                    </div>
                    <div className="displayName text-muted">
                        {"@" + username}
                    </div>
                </div>

                <div className="reply-to text-muted"
                    style={
                        {
                            display: (replyTo) ? "block" : "none"
                        }
                    }
                >
                    {"Replying to "}

                    <Link 
                        to={"/" + replyTo}
                        onClick={(e) => handlePropagation(e)}
                    >
                        @{replyTo}
                    </Link>

                </div>
                
                <div className="content">
                    <div className="text">
                        {content}
                    </div>
                    {/* <div className="timestamp">
                        {props.post.createdAt}
                    </div> */}
                    <div className="button-container mt-1">

                        <div className="replies">
                            <div className="replies-wrapper" onClick={(e) => openModal(e)}>
                                <div className="icon-wrapper replies">
                                    <TbBrandHipchat />
                                </div>
                                <div className="num-replies">{(replyCount > 0) ? replyCount : ""}</div>
                            </div>
                        </div>

                        <div className="shares">
                            <div className="shares-wrapper" onClick={(e) => handleShare(e)}>
                                <div className="icon-wrapper shares">
                                    <TbRepeat style={ {color: (userShared) ? "rgb(14, 94, 0)" : "" }} />
                                </div>
                                <div className="num-shares" style={ {color: (userShared) ? "rgb(14, 94, 0)" : "" }}>{(shareCount > 0) ? shareCount : ""}</div>
                            </div>
                            
                        </div>

                        <div className="likes">
                            <div className="likes-wrapper" onClick={(e) => handleLike(e)}>
                                <div className="icon-wrapper likes">
                                    {(userLiked) ? <AiFillHeart style={ {color: "rgb(236, 0, 90)"}}/> : <AiOutlineHeart />}
                                </div>
                                <div className="num-likes" style={ {color: (userLiked) ? "rgb(236, 0, 90)" : "" }}>{(likeCount > 0) ? likeCount : ""}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ModalPost fullName={fullName} 
                       username={username} 
                       content={content} 
                       setShow={setShow} 
                       show={show} 
                       postId={post.id}
                       setPosts={setPosts}
                       setReplyCount={setReplyCount}
            />
        </Container>
    )
}

export default ListedPost;