import {React, useEffect, useState} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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

function App() {

  const [user, setUser] = useState(null);
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
          console.log(data);
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
      navigate("/home", {replace: true})
    }
  }, [user])

  return (
    <div className="App">
      <div className="main">
        {
          (isLoading) ? "test" : 
          <Container fluid className="content d-flex h-100">
            <NavigationBar user={user}/>
            <Container className="main h-100">
              <Routes>
                <Route element={<ProtectedRoute user={user}/>}>
                  <Route path="home" element={<Home />} />
                  <Route path=":username/*" element={<Profile />} />
                </Route>
                <Route element={<PublicRoute user={user} />}>
                  <Route index element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                  <Route path="login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                  <Route path="signup" element={<Signup />}  />
                </Route>
              </Routes>
            </Container>
            <SearchBar />
          </Container> 
        }     
      </div>
    </div>
  );
}

export default App;
