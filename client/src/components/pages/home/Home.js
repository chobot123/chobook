import React, { useState, useEffect } from "react";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LeftNav from "../../navbar/left-nav/LeftNav";
import Main from "./components/main/Main";
import RightBar from "./components/right-bar/RightBar";

const Home = () => {

    return (
        <Container fluid className="home h-100">
            <div className="wrapper h-100">
                <Row className="content flex-nowrap">
                    <Main />
                    <RightBar />
                </Row>
            </div>
        </Container>
    )
}

export default Home;