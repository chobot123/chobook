import {React, useEffect, useState} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import "./App.css";
import Signup from "./pages/auth/signup/Signup";
import Post from "./pages/post/Post";
import NavigationBar from "./navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";

function App() {

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  return (
    <div className="App">
      <div className="main">
        <Row className="h-100 flex-nowrap">
          <Col xs="auto">
            <NavigationBar />
          </Col>
          <Col xs="auto">
            <Container className="content">
                        {/* <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/post" element={<Post />} />
                        {{posts.length>0 && posts.map((post) => 
                                    <Route
                                        key={post._id}
                                        exact path={'/posts/' + post._id}
                                        element={<Post post={post} user={user} posts={posts} setPosts={setPosts}/>}
                                    >
                                    </Route>
                                  )
                        }
                        }
                      </Routes> */}
            </Container>
          </Col>
        </Row>
        
        
      </div>
    </div>
  );
}

export default App;
