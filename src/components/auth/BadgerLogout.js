import React, { useContext, useEffect } from 'react';
import LoggedInContext from '../../contexts/LoggedInContext';

export default function BadgerLogout() {
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_1c5bcd34828a97342b93"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // Maybe you need to do something here?
            setLoggedIn(false);
            sessionStorage.setItem("username", "");
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}