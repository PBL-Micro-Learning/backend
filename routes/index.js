const express = require('express');
const router = express.Router();

const controllers = require('../controllers');
const middlewares = require('../middlewares');

// auth
router.post('/auth/register', controllers.auth.register);
router.post('/auth/login', controllers.auth.login);
router.get('/auth/whoami', middlewares.validate, controllers.auth.whoami);

module.exports = router;