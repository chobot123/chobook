import {React, useState} from "react";
import Header from "./navbar/Header";
import Signup from "./pages/signup/Signup";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header loggedIn={loggedIn}/>
      <Signup />
    </div>
  );
}

export default App;
