import {lazy, React, Suspense, useEffect, useState} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import NavigationBar from "./navbar/Navbar";
import { Container } from "react-bootstrap";
// import Home from "./pages/home/Home";
import ProtectedRoute from "./utility/ProtectedRoute";
import SearchBar from "./navbar/SearchBar";
import Profile from "./pages/profile/Profile";
import PublicRoute from "./utility/PublicRoute";
import Post from "./pages/posts/post_single/Post";
// import PostsAll from "./pages/posts/PostsAll";
import PostsReplies from "./pages/posts/PostsReplies";
import PostsShares from "./pages/posts/PostsShares";
import PostsLikes from "./pages/posts/PostsLikes";
import Posts from "./pages/posts/Posts";
import InboxMain from "./pages/inbox/InboxMain";

const Home = lazy(() => import("./pages/home/Home"));
const PostsAll = lazy(() => import ("./pages/posts/PostsAll"));
// const Profile = lazy(() => import("./pages/profile/Profile"));
// const Post = lazy(() => import("./pages/posts/post_single/Post"));

const RoutesController = () => {

    const [user, setUser] = useState("");
    const [posts, setPosts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {

        const setLoginStatus = async () => {

            try {

                const response = await fetch("/api/auth/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();

                if(data.success) {
                    setUser(data.user);
                }else {
                    setLoggedIn(false);
                    setUser("");
                }

            } catch (err) {

                //(MAYBE) SET ERROR STATE AND CREATE ERROR COMPONENT
                console.log("error - auth (Routes.js): " + err);

            }   
        }

        setLoginStatus();

    }, [loggedIn])
    
    useEffect(() => {

        const getCurrentUserPosts = async () => {

            try {

                const response = await fetch("api/posts/all", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();

                if(data.success && data.posts) {
                    setPosts(data.posts);
                } else {
                    navigate("/login");
                }

            } catch (err) {

                //(MAYBE) SET ERROR STATE AND CREATE ERROR COMPONENT
                console.log("error - auth (Routes.js): " + err);
            }

        }

        getCurrentUserPosts();
        
    }, [user, navigate])

    return (
        <Suspense fallback={<>Loading...</>}>
            <Container fluid className="content d-flex h-100">
  
                {(!user) ? "" : <NavigationBar user={user} setUser={setUser} setLoggedIn={setLoggedIn}/>}

                <Container className="main h-100">
                    <Routes>
                        <Route element={<ProtectedRoute user={user}/>}>
            
                            <Route path="home" 
                                element={<Home 
                                            username={user.username} 
                                            posts={posts} 
                                            setPosts={setPosts}/>}
                            >

                                <Route index element={
                                    <Suspense fallback={<>Loading Posts All</>}>
                                        <PostsAll />
                                    </Suspense>
                                } />

                            </Route>

                            <Route path="messages" element={<InboxMain />} />

                            <Route path=":username" element={<Outlet />}>

                                <Route element={<Profile />}>

                                    <Route index element={<Posts />} />
                                    <Route path="with_replies" element={<PostsReplies />} />
                                    <Route path="shares" element={<PostsShares />} />
                                    <Route path="likes" element={<PostsLikes />} />

                                </Route>

                                <Route path="status/:post" element={<Post />} />

                            </Route>
                        
                        </Route>
                        <Route element={<PublicRoute user={user} />}>

                            <Route index element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                            <Route path="login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                            <Route path="signup" element={<Signup />}  />

                        </Route>
                    </Routes>
                </Container>

                {(!user) ? "" : <SearchBar loggedIn={loggedIn}/>}

            </Container>   
        </Suspense>
    )
}

export default RoutesController;