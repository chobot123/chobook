import React, { useEffect, useState } from "react";
import ListedPost from "./post_list/ListedPost";

const Posts = ({username}) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/api/posts/" + username + "/posts",
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
                        />
            }) : <></>}
        </div>
    )
}

export default Posts;