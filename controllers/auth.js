const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const { OAuth2Client} = require('google-auth-library');
const fetch = require('node-fetch');

// Register
exports.signup = (req,res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        })
    });
};

// Login
exports.signin = (req,res) => {
    // Find user based on email
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        // If no user, send error.
        if (err || !user){
            return res.status(400).json({
                error: 'User with that email does not exist.'
            })
        }
        // If user, ensure email/password match.
        if (!user.authenticate(password)){
            return res.status(401).json({
                error: 'Invalid login.'
            })
        }

        // Gen token with user id + secret.
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        // Persist token in cookie w expiry date
        res.cookie('t', token, {expire: new Date() + 99999 });

        // Return user + token to fe.
        const { _id, name, role } = user;
        return res.json({
            token,
            user: {_id, email, name, role}
        })
    });
};

exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    User.findOne({email}, (err, user) => {
        if (err || !user){
            return res.status(400).json({
                error: 'User with that email does not exist.'
            })
        }

        const token = jwt.sign({ _id: user._id, name: user.name}, process.env.JWT_RESET_PASSWORD, {expiresIn: '10m'});

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Password reset',
            html: `
                <h1>Please use the following link to reset your password.</h1>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                <hr />
                <p>This email may contain sensitive information.</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        };

        return user.updateOne({resetPasswordLink: token}, (err, success) => {
            if (err){
                console.log('RESET PASSWORD LINK ERROR!!!');
                return res.status(400).json({
                    error: 'Database connection error.'
                })
            } else {
                // TODO: Sign up and setup sendgrid
                console.log(`Email sent to ${email}.`);
                console.log(`Reset link is:  ${process.env.CLIENT_URL}/auth/password/reset/${token}`);
                return res.json({
                    message: `Email has been sent to ${email}`
                })
                // sgMail
                //     .send(emailData)
                //     .then(sent => {
                //         return res.json({
                //             message: `Email has been sent to ${email}.`
                //         })
                //     })
                //     .catch(err => {
                //         return res.json({
                //             message: err.message
                //         })
                //     })
            }
        });

    })

};

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink){
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, (err, decodedData) => {
            if (err){
                return res.status(400).json({
                    error: 'The link you requested has expired.'
                })
            }

            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'Oops, something went wrong. No user found.'
                    })
                }

                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                }

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err){
                        return res.status(400).json({
                            error: 'Oops something went wrong. Error updating user password.'
                        })
                    }
                    res.json({
                        message: 'Success! You can now log in with your new password.'
                    })
                });
            });
        })
    }
};

// Signout
exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: "User signed out"
    })
};

// METHOD: Middleware Require Sign in
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

// METHOD: Is Authenticated
exports.isAuth = (req,res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user){
        return res.status(403).json({
            error: 'Access denied.'
        })
    }
    next();
};

// METHOD: Is Admin
exports.isAdmin = (req,res,next) => {
    // Check if user is admin
    // Admin role value is 1. Public user role is 0
    if ((req.profile.role === 0)){
        return res.status(403).json({
            error: 'Admin Resource. Access denied'
        })
    }
    next();
};

// Google Login
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
exports.googleLogin = (req,res) => {
    const { idToken } = req.body;

    client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT_ID})
        .then(response => {
            console.log('Google login response: ', response);
            const { email_verified, name, email } = response.payload;
            // Check email verified is true
            if (email_verified){
                // Check if the user already exists in the database
                User.findOne({ email }).exec((err, user) => {
                    if (user){
                        console.log('User found: ', user);
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: '7d'});
                        const { _id, email, name, role } = user;
                        return res.json({
                            token,
                            user: { _id, email, name, role }
                        })
                    } else {
                        let password = email + process.env.JWT_SECRET;
                        user = new User({ name, email, password })
                        user.save((err, data) => {
                            if (err) {
                                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                                return res.status(400).json({
                                    error: 'User signup failed with Google.'
                                })
                            }
                            const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {expiresIn: '7d'});
                            const { _id, email, name, role } = data;
                            return res.json({
                                token,
                                user: { _id, email, name, role }
                            })
                        })
                    }
                })
            } else {
                return res.status(400).json({
                    error: 'Google login failed, try again.'
                })
            }
        })
        .catch(err => console.log('Error'))
};

// Facebook Login
exports.facebookLogin = (req,res) => {
  console.log('Facebook Login: ', req.body);
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return (
      fetch(url, {
          method: "GET"
      })
          .then(response => response.json())
          .then(response => console.log('Facebook response is: ', response))
          .then(response => {
              const { email, name } = response;
              User.findOne({ email }).exec((err, user) => {
                if (user){
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: '7d'});
                    const { _id, email, name, role } = user;
                    return res.json({
                        token,
                        user: { _id, email, name, role }
                    });
                } else {
                    let password = email + process.env.JWT_SECRET;
                    user = new User({ name, email, password })
                    user.save((err, data) => {
                        if (err) {
                            console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                            return res.status(400).json({
                                error: 'User signup failed with Facebook.'
                            })
                        }
                        const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {expiresIn: '7d'});
                        const { _id, email, name, role } = data;
                        return res.json({
                            token,
                            user: { _id, email, name, role }
                        })
                    })
                }
              })
          })
          .catch(err => res.json({
              error: 'Facebook login failed.'
          }))
  );

};