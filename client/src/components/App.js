import {React, useEffect, useState} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import "./App.css";
import Signup from "./pages/auth/signup/Signup";
import NavigationBar from "./navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import Home from "./pages/home/Home";
import ProtectedRoute from "./utility/ProtectedRoute";
import SearchBar from "./navbar/SearchBar";
import Profile from "./pages/profile/Profile";

function App() {

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
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
            console.log(data.user);
            setUser(data.user);
            setLoading(false);
          }
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <div className="main">
        {(isLoading) ? "" : <Container fluid className="content d-flex h-100">
          <NavigationBar />
          <Container className="main h-100">
            <Routes>
              <Route element={<ProtectedRoute user={user}/>}>
                <Route index path="home" element={<Home />} />
                <Route path=":username" element={<Profile />} />
              </Route>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />}  />
            </Routes>
          </Container>
            <SearchBar />
        </Container> }     
      </div>
    </div>
  );
}

export default App;
