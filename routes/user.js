const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, read, update, list } = require('../controllers/user');

// Get user by ID (Admin only)
router.get('/user/secret/:userId', requireSignin, isAuth, isAdmin, (req,res) => {
    res.json({
        user: req.profile
    });
});

// Get users
router.get('/users/list', requireSignin, list);

// View profile
router.get('/user/:userId', requireSignin, isAuth, read);

// Update profile
router.put('/user/:userId', requireSignin, isAuth, update);

router.param('userId', userById);

module.exports = router;