import React from "react";
import { Image } from "react-bootstrap";
import image from "./placeholder.jpg";

const ProfilePicture = (props) => {

    return (
        <div className="profile-picture">
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
    )
}

export default ProfilePicture;