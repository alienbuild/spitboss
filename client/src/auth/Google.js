import React from "react";
import GoogleLogin from "react-google-login";
import {googleSignin} from "./index";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ColourShadePicker } from "../utils/ColourShadePicker";

const Google = ({ informParent = f => f }) => {

    // Styles
    const useStyles = makeStyles({
        root: {
            backgroundColor: '#FFFFFF',
            color: '#202124',
            '&:hover': {
                background: ColourShadePicker('#FFFFFF', -5),
            },
        }
    })
    const classes = useStyles();

    // Google response
    const responseGoogle = (response) => {
        console.log('Google res is: ', response.tokenId);
        googleSignin({idToken: response.tokenId})
            .then(res => {
                console.log('Success Google Signin', res);
                // Inform parent component
                informParent(response);
            })
            .catch(err => console.log('Error Google Signin: ', err))
    };

    return(
        <>
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                render={renderProps => (
                    <Button
                        color={`primary`}
                        fullWidth
                        className={classes.root}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >Google</Button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={`single_host_origin`}
            />
        </>
    )
}

export default Google;