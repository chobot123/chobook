import React, { useEffect, useState } from "react";
import "./Post.css";

const Post = () => {

    const [postId, setPostId] = useState("62d08cf22e31b299892e17ca");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [content, setContent] = useState("");
    const [timeStamp, setTimeStamp] = useState("");
    const [likeCount, setLikeCount] = useState(0);
    const [replyCount, setReplyCount] = useState(0);
    const [sharesCount, setSharesCount] = useState(0);

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
                    setFullName(post.author.firstName + " " + post.author.lastName);
                    setUsername("@" + post.author.username);
                    setContent(post.content);
                    setTimeStamp(post.createdAt);
                    setLikeCount(post.numLikes);
                    setReplyCount(post.numReplies);
                    setSharesCount(post.numShares);
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
                <i class="bi bi-balloon-heart post like"></i>
                <i class="bi bi-chat post chat"></i>
                <i class="bi bi-share post share"></i>
            </div>
            <div className="replies-container"></div>
        </div>
    )
}

export default Post;