import React from "react";
import { Link } from "react-router-dom";
import "./Tab.css";

const Tab = (props) => {

    return (
        <Link className="tab tab-width d-flex align-items-center" to={`/${props.name}`}>
            <div className="wrapper">
                <i className={props.icon}></i>
                <div className="link-to d-none  d-xl-block">{props.name}</div>
            </div>
        </Link>
    )
}

export default Tab;