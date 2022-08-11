import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ListedPost from "./post_list/ListedPost";

const PostsAll = () => {

    const [posts, setPosts] = useOutletContext();
    
    useEffect(() => {
        fetch("/api/posts/all",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if(data.success && data.posts) {
                            setPosts(data.posts);
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="post-container w-100">
            {(posts) ? posts.map((post) => {
                return <ListedPost
                            key={post.id}
                            post={post}
                            setPosts={setPosts}
                        />
            }) : <></>}
        </div>
    )
}

export default PostsAll;