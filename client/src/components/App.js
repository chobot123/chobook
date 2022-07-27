import {React, useEffect, useState} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import "./App.css";
import Signup from "./pages/auth/signup/Signup";
import Post from "./pages/post/Post";
import NavigationBar from "./navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import Home from "./pages/home/Home";
import ProtectedRoute from "./ProtectedRoute";
import SearchBar from "./navbar/SearchBar";

function App() {

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const verified = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  }

  useEffect(() => {
    fetch("/api/auth/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      response.json() 
      .then((data) => {
        console.log(data);
        data.success ? setIsLoggedIn(true) : setIsLoggedIn(false);
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}, [])

  return (
    <div className="App">
      <div className="main">
        <Container fluid className="content d-flex h-100">
          <Row className="w-100 flex-nowrap">
            <Col xs="auto" sm="3" className="leftbar">
              <NavigationBar />
            </Col>
            <Col xs="auto" sm="9">
              <Row className="h-100">
                <Col xs="auto" lg="7">
                  <Routes>
                    <Route index element={<Login verified={verified}/>} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />}  />
                    <Route path="home" element={<Home />} />
                  </Routes>
                </Col>
                <Col sm="5" className="side-nav d-none d-lg-block">
                  <SearchBar />
                </Col>
              </Row>  
            </Col>
          </Row>
        </Container>      
      </div>
    </div>
  );
}

export default App;
