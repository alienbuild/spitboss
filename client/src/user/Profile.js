import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import Default from '../layouts/Default';
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";

const Profile = ({match}) => {
    // Init state
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        // TODO: Add more as necessary
        error: false,
        success: false
    });

    const {token} = isAuthenticated();

    const { name, email, password, error, success } = values;

    const init = (userId) => {
        console.log('User ID is:', userId);
        read(userId, token)
            .then(data => {
                if (data.error){
                    setValues({...values, error: true})
                } else {
                    setValues({...values, name: data.name, email: data.email})
                }
            })
    };

    // Handle form changes
    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    };

    // Handle submit
    const clickSubmit = (e) => {
        e.preventDefault();
        update(match.params.userId, token, {name, email, password})
            .then(data => {
                if(data.error){
                    console.log(data.error);
                } else {
                    updateUser(data, () => {
                        setValues({...values, name: data.name, email: data.email, success: true})
                    })
                }
            })
    };

    // Redirect
    const redirectUser = (success) => {
        if(success){
            return <Redirect to={'/'} />
        }
    };

    const profileUpdate = ( name, email, password ) => (
        <form>
            <label htmlFor="">Name</label>
            <input type="text" onChange={handleChange('name')} value={name} />
            <br/>
            <label htmlFor="">Email</label>
            <input type="email" onChange={handleChange('email')} value={email} />
            <br/>
            <label htmlFor="">Password</label>
            <input type="password" onChange={handleChange('password')} value={password} />
            <br/>
            <button onClick={clickSubmit}>Submit</button>
        </form>
    );

    useEffect(() => {
        init(match.params.userId);
    }, []);

    return(
        <Default title="Profile" description="Profile description">
            <h2>Profile update.</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Default>
    )

};

export default Profile;