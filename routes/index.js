const express = require('express');
const router = express.Router();

const controllers = require('../controllers');
const middlewares = require('../middlewares');

// auth
router.post('/auth/register', controllers.auth.register);
router.post('/auth/login', controllers.auth.login);
router.get('/auth/whoami', middlewares.validate, controllers.auth.whoami);

// course 
router.post('/courses', controllers.course.create);
router.get('/courses', controllers.course.index);
router.get('/courses/:id', controllers.course.show);
router.put('/courses/:id', controllers.course.update);
router.delete('/courses/:id', controllers.course.destroy);

// lesson 
router.post('/lessons', controllers.lesson.create);
router.get('/lessons', controllers.lesson.index);
router.get('/lessons/:id', controllers.lesson.show);
router.put('/lessons/:id', controllers.lesson.update);
router.delete('/lessons/:id', controllers.lesson.destroy);

module.exports = router;