import React, { useState } from "react";
import { Container, Form, InputGroup, Image, Button, Row, Col } from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";
import "./SearchBar.css";
import image from "./placeholder.jpg";
import { Link } from "react-router-dom";

const SearchBar = () => {

    const [search, setSearch] = useState("");

    const handleFocus = (e) => {

        let searchIcon = document.getElementById("search-icon");

        e.target.style.backgroundColor = "white";
        e.target.style.borderColor = "rgb(95, 214, 255)";
        searchIcon.style.backgroundColor= "white";
        searchIcon.style.borderColor = "rgb(95, 214, 255)";

    }

    const handleBlur = (e) => {
        let searchIcon = document.getElementById("search-icon");

        e.target.style.backgroundColor = "rgb(233, 241, 241)";
        e.target.style.borderColor = "rgb(233, 241, 241)";
        searchIcon.style.backgroundColor= "rgb(233, 241, 241)";
        searchIcon.style.borderColor = "rgb(233, 241, 241)";
    }

    return (
        <div className="search-bar">
            <div className="wrapper">
            <Form className="search-form" onSubmit={() => console.log("submitted")}>
                <InputGroup className="search-container">
                    <InputGroup.Text id="search-icon"><RiSearch2Line /></InputGroup.Text>
                    <Form.Control 
                        placeholder="Search Chobook" 
                        type="text" 
                        aria-label="search" 
                        onFocus={(e) => handleFocus(e)}
                        onBlur={(e) => handleBlur(e)}
                        aria-describedby="search-icon" 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>
            </Form>
            
            <div className="who-to-follow mt-1 p-3">
                <div className="title h4 pb-2">Who to follow</div>
                <div className="suggestions pb-2">
                    <div className="user d-flex justify-content-between">
                        <div className="profile d-flex">
                            <Image src={image} alt="profile picture"  
                                    roundedCircle="true"
                                    style={
                                            {
                                                height: "48px",
                                                width: "48px",
                                            }
                                        }
                            />
                            <div className="info">
                                <div className="name">Demo Account1</div>
                                <div className="username">@demoaccount1</div>
                            </div>
                        </div>
                        <Button className="follow">Follow</Button>
                    </div>

                    <div className="user d-flex justify-content-between">
                        <div className="profile d-flex">
                            <Image src={image} alt="profile picture"  
                                    roundedCircle="true"
                                    style={
                                            {
                                                height: "48px",
                                                width: "48px",
                                            }
                                        }
                            />
                            <div className="info">
                                <div className="name">Demo Account222222222222222222</div>
                                <div className="username">@demoaccount2</div>
                            </div>
                        </div>
                        <Button className="follow">Follow</Button>
                    </div>

                    <div className="user d-flex justify-content-between">
                        <div className="profile d-flex">
                            <Image src={image} alt="profile picture"  
                                    roundedCircle="true"
                                    style={
                                            {
                                                height: "48px",
                                                width: "48px",
                                            }
                                        }
                            />
                            <div className="info">
                                <div className="name">Demo Account3</div>
                                <div className="username">@demoaccount3</div>
                            </div>
                        </div>
                        <Button className="follow">Follow</Button>
                    </div>
                </div>
                <div className="connect link pt-2">
                    <Link to="connect" className="connect">Show more</Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SearchBar;