const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');

// Get user by id (admin)
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user){
            return res.status(400).json({
                error: 'User not found.'
            })
        }
        // Return user
        req.profile = user;
        next();
    })
};

// List Users
exports.list = (req,res) => {
    User.find().exec((err, data) => {
        if (err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })
};

// Get user
exports.read = (req,res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

// Update user
exports.update = (req,res) => {
    User.findOneAndUpdate(
        // Find by id
        {_id: req.profile._id},
        // Update matching fields
        {$set: req.body},
        {new: true},
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'You are not authorised to do this.'
                })
            }
            // Don't return the password.
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user)
        }
    );
};