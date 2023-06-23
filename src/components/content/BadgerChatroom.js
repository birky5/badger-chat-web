import React, { useContext, useEffect, useRef, useState } from "react"
import { Button, Form } from "react-bootstrap";
import LoggedInContext from "../../contexts/LoggedInContext";
import BadgerMessage from "./BadgerMessage";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const title = useRef();
    const content = useRef();
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_1c5bcd34828a97342b93"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
            //console.log(json.messages)
        })
    };

    useEffect(() => {
        loadMessages()
    }, [props]);

    const postMessage = () => {
        if (loggedIn === false) {
            alert("You must be logged in to post!");
        } else if (title.current.value === "" || content.current.value === "") {
            alert("You must provide both a title and content!");
        } else {
            fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": "bid_1c5bcd34828a97342b93"
                },
                body: JSON.stringify({
                    title: title.current.value,
                    content: content.current.value
                })
            }).then(res => res.json())
            .then(json => {
                if (json.msg === "Successfully posted message!") {
                    alert("Successfully posted!");
                    title.current.value = "";
                    content.current.value = "";
                    loadMessages();
                }
            })
        }
    }

    const deleteMessage = (id) => {
        // console.log("trying to delete post with id: " + id);        
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": "bid_1c5bcd34828a97342b93"
                },
            }).then(res => res.json())
            .then(json => {
                if (json.msg === "Successfully deleted message!") {
                    alert("Successfully deleted the post!")
                    loadMessages();
                }
            })
    }

    const removeButton = (poster, id) => {
        if (poster === sessionStorage.getItem("username")) {
            // console.log(id);
            return (<Button variant="danger" id={id} onClick={() => deleteMessage(id)}>Delete Post</Button>);
        }
    }

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            loggedIn === false ?
                <Form>
                    <Button disabled variant="secondary">You must be logged in to post!</Button>
                </Form>       
                :
                <Form>
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control className='w-25' type="text" ref={title}/>
                    <br></br>

                    <Form.Label>Post Content</Form.Label>
                    <Form.Control className='w-30' type="text" ref={content}/>
                    <br></br>
                    <Button onClick={postMessage}>Create Post</Button>
                </Form>
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        /* TODO: Complete displaying of messages. */
                        messages.map(message => {
                            return <BadgerMessage remove={removeButton} key={message.id} id={message.id} title={message.title} poster={message.poster} content={message.content} created={message.created}></BadgerMessage>
                        })
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}