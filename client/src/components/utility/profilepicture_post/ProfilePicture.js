import React from "react";
import { Image } from "react-bootstrap";

const ProfilePicture = (props) => {

    return (
        <div className="profile-picture">
            <Image src={props.Image} alt="profile picture"  
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