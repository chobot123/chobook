import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "./Posts.css";
import Form from "react-bootstrap/Form";

const Posts = () => {

    const [message, setMessage] = useState("");
    const TEXT_MIN_HEIGHT = 72;
    const TEXT_MAX_HEIGHT = 762;

    const autoResizeText = (element) => {
        element.style.height = TEXT_MIN_HEIGHT + "px";
        if(element.scrollHeight > TEXT_MAX_HEIGHT){
            element.style.height = TEXT_MAX_HEIGHT + "px";
        }else {
            element.style.height = element.scrollHeight + "px";
            console.log(element.style.height);
        }
    }
    
    return (
        <Container className="posts p-0">
            <div className="header p-card">Home</div>
            <div className="draft">
                <div className="post-profile">

                </div>
                <div className="form-container">
                    <Form>
                        <Form.Group className="content">
                            <Form.Control as="textarea" 
                                        id="my-message" 
                                        name="my-message"
                                        onChange={(e) => setMessage(e.target.value)}
                                        onInput={(e) => autoResizeText(e.target)}
                                        placeholder="What's Happening?"
                            >
                            </Form.Control>
                        </Form.Group>
                        <button className="submit" type="submit">Post</button>
                    </Form>
                </div>  
            </div>
            <div className="posts-container">

            </div>
        </Container>
    )
}

export default Posts;