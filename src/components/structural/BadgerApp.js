import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BadgerLayout from './BadgerLayout';
import BadgerLogin from '../auth/BadgerLogin';
import BadgerRegister from '../auth/BadgerRegister';
import BadgerLogout from '../auth/BadgerLogout';
import BadgerChatroom from '../content/BadgerChatroom';
import BadgerChatHome from '../content/BadgerChatHome';
import BadgerNoMatch from '../content/BadgerNoMatch';
import LoggedInContext from '../../contexts/LoggedInContext';

function BadgerApp() {

  const [chatrooms, setChatrooms] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('https://cs571.org/s23/hw6/api/chatroom', {
      headers: {
        "X-CS571-ID": "bid_1c5bcd34828a97342b93",
      }
    }).then(res => res.json()).then(json => {
      setChatrooms(json)
      //console.log(json)
    })
  }, []);

  useEffect(() => {
    //console.log("The context changed to " + loggedIn + " (we are in BadgerApp.js)");
  }, [loggedIn]);

  return (
    <BrowserRouter>
      <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
        <Routes>
          <Route path="/" element={<BadgerLayout chatrooms={chatrooms} />}>
            <Route index element={<BadgerChatHome />} />
            <Route path="/login" element={<BadgerLogin />}></Route>
            <Route path="/register" element={<BadgerRegister />}></Route>
            <Route path="/logout" element={<BadgerLogout />}></Route>
            {
              chatrooms.map(chatroom => {
                return <Route key={chatroom} path={`chatrooms/${chatroom}`} element={<BadgerChatroom name={chatroom} />} />
              })
            }
            <Route path="*" element={<BadgerNoMatch />} />
          </Route>
        </Routes>
      </LoggedInContext.Provider>
    </BrowserRouter>
  );
}

export default BadgerApp;
