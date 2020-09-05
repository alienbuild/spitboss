const express = require('express');
const router = express.Router();
const { requireSignin, isAuth } = require('../controllers/auth');
const { create } = require('../controllers/spitbox');


// Create a room
// router.post('/spitbox/create/:userId', requireSignin, isAuth, create);
router.post('/spitbox/create', create);

module.exports = router;