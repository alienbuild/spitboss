import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Default from '../layouts/default/Default';
import { signup } from "../auth";

const Signup = () => {

    // Init state
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    // Handle form field changes
    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        });
    };

    const {name, email, password, success, error} = values;

    // Handle form submit
    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false});
        signup({name, email, password})
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error, success: false})
                } else {
                    setValues({...values, name: '', email: '', password: '', error: '', success: true})
                }
            })
    };

    // Signup form markup
    const signUpForm = () => (
        <div className={"container"}>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" onChange={handleChange('name')} value={name} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={handleChange('email')} value={email} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handleChange('password')} value={password} />
                </div>
                <div>
                    <button type="submit" onClick={(e) => clickSubmit(e)}>Submit</button>
                </div>
            </form>
        </div>
    );

    // Handle errors
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
    );

    // Handle success
    const showSuccess = () => (
        <div className="alert info" style={{display: success ? '' : 'none'}}>New user created. <Link to="/signin">Please sign in.</Link></div>
    );

    return(
        <Default title="Signup" description="Signup description">
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Default>
    )
};

export default Signup;