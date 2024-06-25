const express = require('express');
const router = express.Router();

const { auth, user, course, lesson, content, quiz, question } = require('../controllers');
const { validate, isAdmin, isLecturer, isStudent } = require('../middlewares');

// auth
router.post('/auth/login', auth.login);
router.get('/auth/whoami', validate, auth.whoami);

// user
router.post('/users', validate, isAdmin, user.create);
router.get('/users', validate, user.index);
router.get('/users/:id', validate, user.show);
router.post('/users/:id/enrollments', validate, auth.login);

// enrollment
router.post('/courses/:id/enroll', validate, isStudent, course.enroll);
router.delete('/courses/:id/unenroll', validate, isStudent, course.unenroll);

// course 
router.post('/courses', validate, isLecturer, course.create);
router.get('/courses', validate, course.index);
router.get('/courses/:id', validate, course.show);
router.put('/courses/:id', validate, isLecturer, course.update);
router.delete('/courses/:id', validate, isLecturer, course.destroy);

// lesson 
router.post('/lessons', validate, isLecturer, lesson.create);
router.get('/lessons', validate, lesson.index);
router.get('/lessons/:id', validate, lesson.show);
router.put('/lessons/:id', validate, isLecturer, lesson.update);
router.delete('/lessons/:id', validate, isLecturer, lesson.destroy);

// quiz
router.post('/quizzes', validate, isLecturer, quiz.create);
router.delete('/quizzes/:id', validate, isLecturer, quiz.destroy);
router.post('/questions', validate, isLecturer, question.create);
router.delete('/questions/:id', validate, isLecturer, question.destroy);

// content
router.post('/contents', validate, isLecturer, content.create);
router.get('/contents', validate, content.index);
router.get('/contents/:id', validate, content.show);
router.put('/contents/:id', validate, isLecturer, content.update);
router.delete('/contents/:id', validate, isLecturer, content.destroy);
router.post('/contents/:id/watch', validate, content.watch);
router.post('/contents/:id/like', validate, content.like);
router.delete('/contents/:id/unlike', validate, content.unlike);
router.post('/contents/:id/comment', validate, content.comment);

module.exports = router;