import React from "react";
import GoogleLogin from "react-google-login";
import {googleSignin} from "./index";

const Google = ({ informParent = f => f }) => {

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
                    <button
                        onClick={renderProps.onClick}
                        className={`social-login__google`}
                        disabled={renderProps.disabled}
                    >
                        Google login
                    </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={`single_host_origin`}
            />
        </>
    )
}

export default Google;