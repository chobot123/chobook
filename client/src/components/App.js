import {React, useState} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.css";

function App() {

  const [isLoggedIn, setisLoggedIn] = useState(true);

  return (
    <div className="App">
      <div className="main">
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
