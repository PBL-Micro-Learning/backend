const express = require('express');
const router = express.Router();

// auth
const { register, login } = require('../controllers/authControllers');
router.post('/auth/register', register);
router.post('/auth/login', login);

module.exports = router;