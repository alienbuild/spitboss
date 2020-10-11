import {API} from '../config';
import {getUser, signOutUser} from "../actions/userActions";

// Handle user signup
export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log('Error', err);
        })
};

// Forgot password
export const forgotPassword = (user) => {
    return fetch(`${API}/forgot-password`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log('Error', err);
    })
};

// Reset password
export const resetPassword = (newPassword, resetPasswordLink) => {
    return fetch(`${API}/reset-password`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPassword)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log('Error', err);
    })
};

// Handle user signin
export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log('Error', err);
        })
};

// Handle Google Signin
export const googleSignin = (tokenId) => {
    return fetch(`${API}/google-login`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tokenId)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log('Error', err);
        })
};

// Handle Google Signin
export const facebookSignin = (tokenId) => {
    return fetch(`${API}/facebook-login`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tokenId)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log('Error', err);
        })
};

// Authenticate
export const authenticate = (data, next) => {
    getUser(JSON.stringify(data));
    if (typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

// Signout
export const signout = (next) => {
    if (typeof window !== 'undefined'){
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: "GET",

        })
            .then(response => {
                console.log('Signed  out.', response)
            })
            .catch((err) => {
                console.log('Error', err);
            })
    }
};

// Is authenticated check
export const isAuthenticated = () => {
    if (typeof window == 'undefined'){
        return false;
    }
    if (localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

// Check is user has completed their profile
export const hasCompletedProfile = (userId) => {
    return fetch(`${API}/user/profile/check/${userId}`, {
        method: "GET",

    })
        .then(response => {
            console.log('Signed  out.', response)
            return response;
        })
        .catch((err) => {
            console.log('Error', err);
            return false;
        })
};