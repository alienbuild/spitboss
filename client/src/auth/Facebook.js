import React from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {facebookSignin} from "./index";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ColourShadePicker } from "../utils/ColourShadePicker";

const Facebook = ({ informParent = f => f }) => {

    // Styles
    const useStyles = makeStyles({
        root: {
            backgroundColor: '#2C88FF',
            color: '#FFFFFF',
            '&:hover': {
                background: ColourShadePicker('#2C88FF', 10),
            },
        }
    })
    const classes = useStyles();

    // Facebook response
    const responseFacebook = (response) => {
        console.log('Facebook res is: ', response);
        facebookSignin({userID: response.userID, accessToken: response.accessToken})
            .then(res => {
                console.log('Success Facebook Signin', res);
                // Inform parent component
                informParent(response);
            })
            .catch(err => console.log('Error Facebook Signin: ', err))
    };

    return(
        <>
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <Button
                        variant={`contained`}
                        color={`primary`}
                        fullWidth
                        className={classes.root}
                        onClick={renderProps.onClick}
                    >Facebook</Button>
                )}
            />
        </>
    )
}
export default Facebook;