import React, { useContext } from 'react';
import { useRef } from 'react';
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import LoggedInContext from '../../contexts/LoggedInContext';

export default function BadgerLogin() {  
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();
    
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

    // TODO Create the login component.

    const logUserIn = () => {
        if (username.current.value === "" || password.current.value === "") {
            alert("You must provide both a username and password!")
        } else {
            // Register the user
            fetch('https://cs571.org/s23/hw6/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": "bid_1c5bcd34828a97342b93"
                },
                body: JSON.stringify({
                    username: username.current.value,
                    password: password.current.value
                })
            }).then(res => {
                if (res.status === 200) {
                    setLoggedIn(true);
                    sessionStorage.setItem("username", username.current.value);
                    navigate('/');
                }
                return res.json();
            }).then(data => {
                if (data.msg === "Incorrect password.") {
                    alert("Incorrect password!");
                } else if (data.msg === "That user does not exist!") {
                    alert("Incorrect username!");
                } else {
                    alert("Login was successful!");
                }
            });
        }
    }

    return <>
        <h1>Login</h1>
        {
            <Form>
                <Form.Label>Username</Form.Label>
                <Form.Control className='w-25' type="text" ref={username}/>
                <br></br>
                <Form.Label>Password</Form.Label>
                <Form.Control className='w-25' type="password" ref={password}/>

                <br></br>
                <Button onClick={logUserIn}>Login</Button>
            </Form>
        }
    </>
}