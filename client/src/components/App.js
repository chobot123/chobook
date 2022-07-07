import {React, useState} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./navbar/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LeftNav from "./navbar/left-nav/LeftNav";
import "./App.css";

function App() {

  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <LeftNav />
        </div>
        <div className="pages">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*"
                element={<Navigate to="/home" replace />}
          />
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
