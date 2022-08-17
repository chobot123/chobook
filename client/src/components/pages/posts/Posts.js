import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import useData from "../../utility/fetch_hook";
import ListedPost from "./post_list/ListedPost";

const Posts = () => {

    const [username, posts, setPosts] = useOutletContext();

    const results = useData("/api/posts/" + username + "/posts", "GET");
    
    // useEffect(() => {
    //     fetch("/api/posts/" + username + "/posts" ,
    //         {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         })
    //         .then((response) => {
    //             response.json()
    //                 .then((data) => {
    //                     if(data.success && data.posts) {
    //                         setPosts(data.posts);
    //                     }
    //                 })
    //                 .catch(err => console.log(err))
    //         })
    //         .catch(err => console.log(err))
    // }, [])

    return (
        <div className="post-container w-100">
            {(results) ? posts.map((post) => {
                return <ListedPost
                            key={post.id}
                            post={post}
                            setPosts={setPosts}
                        />
            }) : <></>}
        </div>
    )
}

export default Posts;