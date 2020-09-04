import React, {useState} from 'react';

// Layout and method imports
import Default from '../layouts/default/Default';

// Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {forgotPassword} from "../auth";

const Forgot = ({setAlert, removeAlert, alerts}) => {

    // Init state
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Submit',
        loading: false
    });

    // Handle form field changes
    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        });
    };

    const { email, loading } = values;

    // Handle form submit
    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, loading: true});
        forgotPassword({email})
            .then(data => {
                if (data.error){
                    setAlert(data.error, 'danger');
                    setValues({...values, loading: false})
                } else {
                    /*TODO: Set button to disabled*/
                    setValues({...values, buttonText: 'Requested.'})
                }
            })
            .catch((err) => console.log('Error submitting forgot password form.'))
    };

    // Forgot form markup
    const forgotForm = () => (
        <div className="container">
            {showLoading()}
            {alerts !== null && alerts.length > 0 && alerts.map((alert) => (
                <Alert key={alert.id} variant={alert.alertType} onClose={() => removeAlert(alert.id)} dismissible>
                    {alert.msg}
                </Alert>
            ))}
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
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
        <Default title="Forgot password" description="Forgot password description">
            {forgotForm()}
        </Default>
    )
};

export default Forgot;