import React, {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken';

// Layout and method imports
import Default from '../layouts/default/Default';

// Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { resetPassword } from "../auth";

const Reset = ({setAlert, removeAlert, alerts, match}) => {

    // Init state
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset password',
        loading: false
    });

    useEffect(() => {
        let token = match.params.token;
        console.log('token is: ', token);
        if (token){
            let { name } = jwt.decode(token);
            console.log('name is: ', jwt.decode(token));
            setValues({...values, name, token});
        }
    },[]);

    // Handle form field changes
    const handleChange = event => {
        setValues({
            ...values,
            error: false,
            newPassword: event.target.value
        });
    };

    const { name, token, newPassword, loading } = values;

    // Handle form submit
    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, loading: true});
        resetPassword({newPassword, resetPasswordLink: token})
            .then(data => {
                if (data.error){
                    setAlert(data.error, 'danger');
                    setValues({...values, loading: false})
                } else {
                    /*TODO: Set button to disabled*/
                    setAlert('Your password has been updated.', 'success');
                    setValues({...values, buttonText: 'Updated :)'})
                }
            })
            .catch((err) => console.log('Error submitting forgot password form.'))
    };

    // Forgot form markup
    const resetForm = () => (
        <div className="container">
            {showLoading()}
            {alerts !== null && alerts.length > 0 && alerts.map((alert) => (
                <Alert key={alert.id} variant={alert.alertType} onClose={() => removeAlert(alert.id)} dismissible>
                    {alert.msg}
                </Alert>
            ))}
            <Form>
                <p>Hey {name}, type your new password.</p>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" onChange={handleChange} value={newPassword} required />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => clickSubmit(e)}>
                    {values.buttonText}
                </Button>
            </Form>
        </div>
    );

    // Handle success
    const showLoading = () => (
        loading && (<div className="alert alert-info">Loading...</div>)
    );

    return(
        <Default title="Reset password" description="Reset password description">
            {resetForm()}
        </Default>
    )
};

export default Reset;