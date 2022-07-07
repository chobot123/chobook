import React from "react";
import "./Tab.css";

const Tab = (props) => {

    return (
        <div className="tab d-flex align-items-center">
            <i className={props.icon}></i>
            <div className="link-to d-none  d-xl-block">{props.name}</div>
        </div>
    )
}

export default Tab;