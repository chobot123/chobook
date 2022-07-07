import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Tab from "./Tab";
import "./Navigation.css";

const Navigation = () => {

    const [tabs, setTabs] = useState([
        {
            name: "Home",
            iconClass: "bi bi-house-door"
        },
        {
            name: "Profile",
            iconClass: "bi bi-person-circle"
        },
        {
            name: "Notifications",
            iconClass: "bi bi-bell"
        },
        {
            name: "Messages",
            iconClass: "bi bi-envelope"
        },
        {
            name: "Logout",
            iconClass: "bi bi-arrow-bar-right"
        },
    ]);

    return (
        <div className="navigation p-card">
            <div className="wrapper">
                <div className="logo">
                    <i className="laugh bi bi-emoji-laughing"></i>
                    <i className="ear bi bi-ear"></i>
                </div>
                {tabs.map((component, index) => {
                    return <Tab key={index} name={component.name} icon={component.iconClass} />
                })}
            </div>
        </div>
    )
}

export default Navigation;