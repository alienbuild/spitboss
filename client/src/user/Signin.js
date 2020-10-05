import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import SpitbossLogo from '../assets/images/spitboss.svg';

// Layout and method imports
import Default from '../layouts/default/Default';
import { signin, authenticate, isAuthenticated } from "../auth";
import {removeAlert, setAlert} from "../actions/alert";

// Bootstrap imports
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Alert from "react-bootstrap/cjs/Alert";
import Form from 'react-bootstrap/cjs/Form';
import Button from 'react-bootstrap/cjs/Button';
import {getUser} from "../actions/userActions";
import Google from "../auth/Google";
import Facebook from "../auth/Facebook";
import Twitter from "../auth/Twitter";

const Signin = () => {

    // Ready dispatch
    const dispatch = useDispatch();

    const alerts = useSelector(state => state.alerts);

    // Init state
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    // Handle form field changes
    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        });
    };

    const { email, password, error, loading, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    // Inform Signin.js of social login responses
    const informParent = response => {
        // TODO: Destructre the response and match redux with current normal login saved state.
        //dispatch(getUser(response.profileObj.name));
        authenticate(response, () => {
            setValues({...values, redirectToReferrer: true})
        });
    }

    // Handle form submit
    const clickSubmit = (e) => {
        e.preventDefault();
        dispatch(removeAlert(alert.id));
        setValues({...values, error: false, loading: true});
        signin({email, password})
            .then(data => {
                if (data.error){
                    dispatch(setAlert(data.error, 'danger'));
                    setValues({...values, loading: false})
                } else {
                    dispatch(getUser(data));
                    authenticate(data, () => {
                        setValues({...values, redirectToReferrer: true})
                    });
                }
            })
    };

    // Signin form markup
    const signUpForm = () => (
        <Row>
            <Col>
                <Form className={`signin__form`}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className={`signin__label`}>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className={`signin__label`}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handleChange('password')} value={password} />
                    </Form.Group>
                    <Link to={"/auth/password/forgot"} className={`signin__forgot-password`}>Forgot password</Link>
                    <Button variant="primary" type="submit" className={`signin__submit`} onClick={(e) => clickSubmit(e)}>
                        Login
                    </Button>
                </Form>
                {showLoading()}
            </Col>
        </Row>
    );

    // Handle success
    const showLoading = () => (
        loading && (<div className="alert alert-info">Loading...</div>)
    );

    // Handle redirect on successful login
    const redirectUser = () => {
        if (isAuthenticated()){
            return <Redirect to="/spitbox" />;
        }
    };

    return(
        <main className={`signin__main`}>
            {alerts !== null && alerts.length > 0 && alerts.map((alert) => (
                <Alert key={alert.id} className={`signin__alert`} variant={alert.alertType} onClose={() => dispatch(removeAlert(alert.id))} dismissible>
                    {alert.msg}
                </Alert>
            ))}
            <section className={`signin__section`}>
                <div className={`signin__content ${alerts !== null && alerts.length > 0 ? 'signin__content--alerts' : null}`}>
                    <Row>
                        <Col>
                            <Link to={`/signup`} className={`signin__register`}>Register</Link>
                            <img src={SpitbossLogo} alt="Spitboss Logo" className={`signin__logo`}/>
                            <h1 className={`signin__heading`}>Welcome to Spitboss</h1>
                            <small className={`signin__small`}>Hold up, where's your credentials at?</small>
                            {signUpForm()}
                        </Col>
                    </Row>
                    <div className="social-login">
                        <ul className={`social-login__list`}>
                            <li className={`social-login__item`}>
                                <Facebook informParent={informParent} />
                            </li>
                            <li className={`social-login__item`}>
                                <Google informParent={informParent} />
                            </li>
                            <li className="social-login__twitter">
                                <Twitter />
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            {redirectUser()}
        </main>
    )
};

export default Signin;