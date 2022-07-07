import {React, useState} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./navbar/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {/* <Header loggedIn={loggedIn}/> */}
      <Home />
    </div>
  );
}

export default App;
