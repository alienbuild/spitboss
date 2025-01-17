const express = require('express');
const router = express.Router();

// Import controllers
const {
    signup,
    signin,
    signout,
    requireSignin,
    forgotPassword,
    resetPassword,
    googleLogin,
    facebookLogin
} = require('../controllers/auth');

// Import validators
const { userSignupValidator, userSignInValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validator');

// User Register/Login
router.post('/signup', userSignupValidator, signup );
router.post('/signin', userSignInValidator, signin );

// Forgot/Reset password
router.put('/forgot-password', forgotPasswordValidator, forgotPassword);
router.put('/reset-password', resetPasswordValidator, resetPassword);

// User Log out
router.get('/signout', signout );

// Google Login
router.post('/google-login', googleLogin);
// Facebook Login
router.post('/facebook-login', facebookLogin);

// Facebook

module.exports = router;