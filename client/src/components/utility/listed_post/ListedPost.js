import React from "react";
import { Container } from "react-bootstrap";
import ProfilePicture from "../profilepicture_post/ProfilePicture";

const ListedPost = (props) => {

    return (
        <Container>
            <ProfilePicture image={props.image}/>
            <div className="info">
                <div className="user">
                    <div className="name">
                        {props.firstName + " " + props.lastName}
                    </div>
                    <div className="displayName">
                        {"@" + props.username}
                    </div>
                </div>
                <div className="content">
                    <div className="text">
                        {props.text}
                    </div>
                    <div className="image"></div>
                    <div className="button-container">
                        <div className="replies"></div>
                        <div className="shares"></div>
                        <div className="likes"></div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListedPost;