import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Login from "./type/Login";
import Main from "./type/Main";

const Header = (props) => {

    //useEffect to check if logged in

    return (
        <Navbar bg="light" variant="light" expand="lg" fixed="top"> 
            <Container>
                <Navbar.Brand>Name</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    <Nav className="links">
                        {(props.loggedIn) ? <Main /> : <Login />}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;