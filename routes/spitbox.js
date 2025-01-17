const express = require('express');
const router = express.Router();
const { requireSignin, isAuth } = require('../controllers/auth');
const { create, list, read } = require('../controllers/spitbox');


// Create a room
router.post('/spitbox/create', requireSignin, isAuth, create);

// List rooms
router.get('/spitbox/list', list);

// Get room by id
router.get('/spitbox/read/:id', read);

module.exports = router;