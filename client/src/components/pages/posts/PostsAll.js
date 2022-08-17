import React, { lazy } from "react";
import { useOutletContext } from "react-router-dom";
import useData from "../../utility/fetch_hook";
// import ListedPost from "./post_list/ListedPost";

const ListedPost = lazy(() => import("./post_list/ListedPost"));

const PostsAll = () => {

    const [posts, setPosts] = useOutletContext();
    
    const results = useData("/api/posts/all", "GET");
    
    // useEffect(() => {
    //     fetch("/api/posts/all",
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
                return  <ListedPost
                            key={post.id}
                            post={post}
                            setPosts={setPosts}
                        />
            }) : <></>}
        </div>
    )
}

export default PostsAll;