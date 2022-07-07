import React from "react";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "./components/navigation/Navigation";
import Posts from "./components/posts/Posts";
import Follow from "./components/follow/Follow";

const Home = () => {

    return (
        <Container fluid className="home h-100">
            <Row className="wrapper body h-100">
                <Col className="navigation-container p-0">
                    <Navigation />
                </Col>
                <Col className="main-container p-0">
                    <Posts />
                    <Follow />
                </Col>
            </Row>
        </Container>
    )
}

export default Home;