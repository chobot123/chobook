import React from "react";
import { Container } from "react-bootstrap";
import image from "./placeholder.jpg";

const PostContainer = () => {

    return (
        <Container className="post_container">
            <div className="profile_picture">
                <Image src={image} alt="profile picture"  
                    roundedCircle="true"
                    style={
                        {
                            height: "48px",
                            width: "48px",
                        }
                    }
                />
            </div>
            <div className="wrapper">
                <div className="user_container">
                    
                </div>
                <div className="content">
                    <div className="form">

                    </div>
                    <div className="content_buttons">
                        
                    </div>
                </div>
            </div>
        </Container>
    )

}

export default PostContainer;