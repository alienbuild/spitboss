const express = require('express');
const router = express.Router();
const { requireSignin, isAuth } = require('../controllers/auth');
const { create, list } = require('../controllers/spitbox');


// Create a room
router.post('/spitbox/create', requireSignin, isAuth, create);

// List rooms
router.get('/spitbox/list', list);

module.exports = router;