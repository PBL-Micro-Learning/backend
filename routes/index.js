const express = require('express');
const router = express.Router();

// auth
const { register } = require('../controllers/authControllers');
router.post('/auth/register', register);

module.exports = router;