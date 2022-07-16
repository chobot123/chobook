import React, { useEffect, useState } from "react";
import "./Post.css";

const Post = () => {

    const [postId, setPostId] = useState("62d21720bc70b021c5b09ade");
    const [userLiked, setUserLiked] = useState(false);
    const [useShared, setUserShared] = useState(false);
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
                        setUserLiked(data.userHasLiked)
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
                        console.log(data);
                        setUserLiked(data.userHasLiked)
                        //change statuses
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
                <div className="react-wrapper" onClick={(e) => handleLike(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                            width="16" height="16" 
                            fill="currentColor" 
                            className="bi bi-heart post img like" 
                            viewBox="0 0 16 16" 
                            alt="Bootstrap Heart Img">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>
                </div>
                <div className="react-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                            fill="currentColor" 
                            className="bi bi-chat post img reply" 
                            viewBox="0 0 16 16" 
                            alt="Bootstrap Heart Img">
                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                    </svg>
                </div>
                <div className="react-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                            width="16" height="16" 
                            fill="currentColor" 
                            className="bi bi-repeat post img share" 
                            viewBox="0 0 16 16" 
                            alt="Bootstrap Heart Img">
                        <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
                    </svg>
                </div>
            </div>
            <div className="replies-container"></div>
        </div>
    )
}

export default Post;