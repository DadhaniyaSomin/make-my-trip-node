const express = require('express');
const router = express.Router();
const authRoute = require('./../controller/auth');

//register user
router.post('/register', authRoute.register);
router.post('/login', authRoute.login);

module.exports = router;