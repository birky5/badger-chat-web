import React from 'react';
import { useState } from 'react';
import { Form, Button } from "react-bootstrap";

export default function BadgerRegister() {

    // TODO Create the register component.
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRepeatPassword, setNewRepeatPassword] = useState("");

    const registerUser = () => {
        console.log("Trying to register you!");
        if (newPassword !== newRepeatPassword) {
            alert("Your passwords do not match!");
        } else if (newUsername === "" || newPassword === "") {
            alert("You must provide both a username and password!")
        } else {
            // Register the user
            fetch('https://cs571.org/s23/hw6/api/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": "bid_1c5bcd34828a97342b93"
                },
                body: JSON.stringify({
                    username: newUsername,
                    password: newPassword
                })
            }).then(res => {
                return res.json();
            }).then(data => {
                if (data.msg === "The user already exists!") {
                    alert("That username has already been taken!")
                } else if (data.msg === "Successfully authenticated.") {
                    alert("Account registration successful!");
                }
            });
        }
    }

    return <>
        <h1>Register</h1>
        {
            <Form>
                <Form.Label>Username</Form.Label>
                <Form.Control className='w-25' type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
                <br></br>
                <Form.Label>Password</Form.Label>
                <Form.Control className='w-25' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                <br></br>
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control className='w-25' type="password" value={newRepeatPassword} onChange={(e) => setNewRepeatPassword(e.target.value)}/>

                <br></br>
                <Button onClick={registerUser}>Register</Button>
            </Form>
        }
    </>
}