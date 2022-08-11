import {React, useEffect, useState} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, useNavigate, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import "./App.css";
import Signup from "./pages/auth/signup/Signup";
import NavigationBar from "./navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import Home from "./pages/home/Home";
import ProtectedRoute from "./utility/ProtectedRoute";
import SearchBar from "./navbar/SearchBar";
import Profile from "./pages/profile/Profile";
import PublicRoute from "./utility/PublicRoute";
import Post from "./pages/posts/post_single/Post";
import PostsAll from "./pages/posts/PostsAll";
import PostsReplies from "./pages/posts/PostsReplies";
import PostsShares from "./pages/posts/PostsShares";
import PostsLikes from "./pages/posts/PostsLikes";
import Posts from "./pages/posts/Posts";

function App() {

  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("/api/auth/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      response.json()
        .then((data) => {
          if(data.success) {
            setUser(data.user);
          }else {
            setLoggedIn(false);
          }
          
        })
        .catch(err => console.log(err))
    })
    .catch((err) => {
      console.log(err)
    })

    setLoading(false);
  }, [loggedIn])

  useEffect(() => {
    if(user) {
      fetch("api/posts/all", {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
        }
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

      // navigate("/home", {replace: true})
    }
  }, [user])

  return (
    <div className="App">
      <div className="main">
        {
          (isLoading) ? "" : 
          <Container fluid className="content d-flex h-100">

            {(!user) ? "" : <NavigationBar user={user}/>}

            <Container className="main h-100">
              <Routes>
                <Route element={<ProtectedRoute user={user}/>}>

                  <Route path="home" 
                         element={<Home 
                                    username={user.username} 
                                    posts={posts} 
                                    setPosts={setPosts}/>}
                  >
                    <Route index element={<PostsAll />} />
                  </Route>

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
        }     
      </div>
    </div>
  );
}

export default App;
