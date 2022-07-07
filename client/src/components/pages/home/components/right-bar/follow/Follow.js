import React, { useState, useEffect } from "react";
import "./Follow.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

const Follow = () => {

    const [search, setSearch] = useState("");
    const [searchActive, setSearchActive] = useState(false);

    const clearSearch = (e) => {
        const searchContent = document.getElementById("search");
        searchContent.value = "";
        setSearch("");
    }

    useEffect(() => {
        if(search.length > 0){
            setSearchActive(true);
        }else {
            setSearchActive(false);
        }
    }, [search])

    return (
        <Container className="follow">
            <div className="header p-card">
                <div className="form-container-search">
                    <div className="search-icon p-card">
                        <i className="bi bi-search"></i>
                    </div>
                    <Form>
                        <Form.Group className="search">
                            <Form.Control type="text"
                                        id="search"
                                        name="search"
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search Chobook"
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                    <div className="clear-btn" id="clear-search"
                        onClick={(e) => clearSearch(e)}
                        style={(searchActive) ? {display: "block"} : {display: "none"}}></div>
                </div>
            </div>
        </Container>
    )
}

export default Follow;