import React, { useEffect, useState} from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import {isAuthenticated, signout} from "../../../auth";
import {signOutUser} from "../../../actions/userActions";
import {useDispatch} from "react-redux";

const Header = ({ title, description, history }) => {

    // Ready dispatch
    const dispatch = useDispatch();

    // Load
    const init = () => {

    };

    useEffect(() => {
        init();
    }, []);

    // Handle redirect on successful login
    const redirectUser = () => {
        if (!isAuthenticated()){
            return <Redirect to="/" />;
        }
    };

    return(
        <header>
            <div className="container">
                <button onClick={(e) => signout(() => {
                    dispatch(signOutUser());
                    history.push('/signin');
                })}>Sign out</button>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </header>
    )
};

export default withRouter(Header);
