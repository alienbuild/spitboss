import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Default from '../layouts/default/Default';
import { signup } from "../auth";
import SpitbossLogo from "../assets/images/spitboss.svg";
import Form from "react-bootstrap/cjs/Form";
import Button from "react-bootstrap/cjs/Button";

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
            <form className={`signup__form`}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className={`signup__label`}>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={handleChange('name')} value={name} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label className={`signup__label`}>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label className={`signup__label`}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange('password')} value={password} />
                </Form.Group>

                <Button variant="primary" type="submit" className={`signup__submit`} onClick={(e) => clickSubmit(e)}>
                    Register
                </Button>
            </form>
        </div>
    );

    // Handle errors
    const showError = () => (
        <div className="alert alert-danger signup__alert" style={{display: error ? '' : 'none'}}>{error}</div>
    );

    // Handle success
    const showSuccess = () => (
        <div className="alert info signup__alert" style={{display: success ? '' : 'none'}}>New user created. <Link to="/signin">Please sign in.</Link></div>
    );

    return(
        <main className={`signup__main`}>
            {showSuccess()}
            {showError()}
            <section className="signup__section">
                <div className={`signup__content ${success ? 'signup__content--success' : null} ${error ? 'signup__content--error' : null}`}>
                    <Link to={`/signin`} className={`signup__register`}>Login</Link>
                    <img src={SpitbossLogo} alt="Spitboss Logo" className={`signup__logo`}/>
                    <h1 className={`signup__heading`}>Register</h1>
                    <small className={`signup__small`}>You're free to sign up, but you'll need to prove yourself to become a boss.</small>
                    {signUpForm()}
                </div>
            </section>
        </main>
    )
};

export default Signup;