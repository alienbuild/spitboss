import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import io from 'socket.io-client';
import SocketContext from './context/socketContext';

// Routes
import Signin from './user/Signin'
import Signup from "./user/Signup";
import Forgot from "./user/Forgot";
import Reset from "./user/Reset";
import Spitbox from "./Components/Spitbox/spitbox"

// Define socket
const socket = io('http://localhost:3000',{
    forceNew: false
});

// On connect
socket.on('connect', () => {
    console.log('Connected to the server.');
});

// On disconnect
socket.on('disconnect', () => {
    console.log('Disconnected from the server.');
});

const Routes = () => {
    return (
        <SocketContext.Provider value={socket}>
            <BrowserRouter>
                <Helmet titleTemplate="Spitboss.com">
                    <title>Spitboss</title>
                </Helmet>
                <Switch>
                    <Route path="/signin" exact component={Signin} socket={socket} />
                    <Route path="/spitbox" exact component={Spitbox} socket={socket} />
                    <Route path="/auth/password/forgot" exact component={Forgot} />
                    <Route path="/auth/password/reset/:token" exact component={Reset} />
                    <Route path="/signup" exact component={Signup} />
                </Switch>
            </BrowserRouter>
        </SocketContext.Provider>
    )
}

export default Routes;