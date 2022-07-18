import React, { useEffect, useState } from "react";
import "./Post.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbHeart, TbBrandHipchat, TbRepeat } from "react-icons/tb";

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
            <div className="post author">
                <div className="post fullName">{fullName}</div>
                <div className="post username text-muted">{username}</div>
            </div>
            <div className="post content">{content}</div>
            <div className="post timestamp"></div>
            <div className="post status">
                <div className="post #likes">{likeCount} Likes</div>
                <div className="post #shares">{sharesCount} Shares</div>
                <div className="post #replies">{replyCount} Replies</div>
            </div>
            <div className="post react">
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
            <div className="replies-container"></div>
        </div>
    )
}

export default Post;