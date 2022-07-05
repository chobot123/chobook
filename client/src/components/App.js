import {React, useState} from "react";
import Header from "./navbar/Header";
import Home from "./pages/signup/Home";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header loggedIn={loggedIn}/>
      <Home />
    </div>
  );
}

export default App;
