import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import image from "./placeholder.jpg";

const CreatePost = (props) => {
    const [content, setContent] = useState("");

    handleSubmit = (e) => {
        e.preventDefault();

        fetch("/api/posts/", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "content": content,
                }
            )
        })
        .then((response) => {
            response.json()
                .then((data) => {
                    //DO SOMETHING
                })
                .catch(err => console.log(err))
        }).catch(err => console.log(err))
    }

    return (
        <Container className="create-post">
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
            <div className="post-form">
                <Form>
                    <Form.Group className="post content">
                        <Form.Control type="text" placeholder="What's Happening?" onChange={(e) => setContent(e.target.value)}/>
                    </Form.Group>

                    <Button className="post submit" variant="primary" type="submit">Post</Button>
                </Form>
            </div>
        </Container>
    )
}

export default CreatePost;