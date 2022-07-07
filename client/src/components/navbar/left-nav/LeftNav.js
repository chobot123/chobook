import React from "react";
import Col from "react-bootstrap/Col";
import Navigation from "./navigation/Navigation";

const LeftNav = () => {

    return (
        <Col className="leftNav">
            <div className="wrapper">
                <Navigation />
            </div>
        </Col>
    )
}

export default LeftNav;