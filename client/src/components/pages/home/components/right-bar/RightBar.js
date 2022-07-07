import React from "react";
import Col from "react-bootstrap/Col";
import Follow from "./follow/Follow";

const RightBar = () => {

    return (
        <Col className="rightBar">
            <div className="wrapper">
                <Follow />
            </div>
        </Col>
    )
}

export default RightBar;