import React from "react";
import TwitterLogin from "react-twitter-auth";
import {facebookSignin} from "./index";

const Twitter = ({ informParent = f => f }) => {

    const responseTwitter = (err, data) => {
        console.log('Twitter res is: ', data);
        // facebookSignin({userID: response.userID, accessToken: response.accessToken})
        //     .then(res => {
        //         console.log('Success Facebook Signin', res);
        //         // Inform parent component
        //         informParent(response);
        //     })
        //     .catch(err => console.log('Error Facebook Signin: ', err))
    };

    return(
        <>
            <TwitterLogin
                loginUrl="http://localhost:3001/api/v1/auth/twitter"
                onFailure={responseTwitter}
                onSuccess={responseTwitter}
                requestTokenUrl="http://localhost:3001/api/v1/auth/twitter/reverse"
            />
        </>
    )
}
export default Twitter;