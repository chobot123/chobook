import React from "react";
import { Image } from "react-bootstrap";
import image from "./placeholder.jpg";
import "./ProfilePicture.css";

const ProfilePicture = ({
    replying,
    reply
}) => {

    return (
        <div className="profile-picture">
            <div className="img-container">
                <Image 
                    src={image} 
                    alt="profile picture"  
                    roundedCircle="true"
                    style={
                        {
                            height: "48px",
                            width: "48px",
                        }
                    }
                />
                {(reply ? <div className="reply link" /> : <></>)}
                {(replying) ? <div className="replying link" /> : <></>}
            </div>
        </div>
    )
}

export default ProfilePicture;