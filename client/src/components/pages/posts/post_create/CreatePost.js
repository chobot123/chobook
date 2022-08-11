import React, { useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import image from "./placeholder.jpg";
import "./CreatePost.css";
import { TbInfoSquare } from "react-icons/tb";

const CreatePost = ({
    postId,
    setPosts,
    setShow,
    setReplyCount
}) => {
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();

        fetch("/api/posts/", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "content": content,
                    "replyTo": (postId) ? postId : undefined,
                }
            )
        })
        .then((response) => {
            response.json()
                .then((data) => {
                    console.log(data);
                    if(data.post && setPosts){
                        setPosts(prev => [...prev, data.post]);
                    }
                    if(data.post && setReplyCount){
                        setReplyCount(prev => prev + 1);
                    }
                    if(setShow) {
                        setShow(false);
                    }
                    setContent("");
                })
                .catch(err => {
                    console.log(err);
                    if(setShow) {
                        setShow(false);
                    }
                    setContent("");
                })
        }).catch(err => console.log(err))
    }

    const autoResizeText = (e) => {

        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";

    }

    return (
        <Container className="create-post p-1 pb-3">
            <div className="profile-pic">
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
            <div className="post-form w-100">
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="post content">
                        <Form.Control 
                            as="textarea"
                            rows="2"
                            placeholder="What's Happening?" 
                            onInput={(e) => autoResizeText(e)}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>

                    <Button className="post submit" 
                            variant="primary" 
                            type="submit"
                            disabled={(content.length > 0) ? false : true}
                    >
                        Post
                    </Button>
                </Form>
            </div>
        </Container>
    )
}

export default CreatePost;