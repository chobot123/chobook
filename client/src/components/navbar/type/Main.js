import React from "react";
import { NavLink } from "react-bootstrap";

const Main = () => {

    const components = ["Home",
                        "Profile",
                        "Notifications",
                        "Messages",
                        "Search",
                        "Logout"]

    return (
        <>
            {components.map((el, index) => {
                return <NavLink href={`#${el}`} key={index}>{el}</NavLink>
            })}
        </>
    )
}

export default Main;