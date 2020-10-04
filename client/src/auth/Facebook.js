import React from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {facebookSignin} from "./index";

const Facebook = ({ informParent = f => f }) => {

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
                    <button
                        className={`social-login__facebook`}
                        onClick={renderProps.onClick}
                    >Continue with Facebook</button>
                )}
            />
        </>
    )
}
export default Facebook;