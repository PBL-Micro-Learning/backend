const express = require('express');
const router = express.Router();

const { auth, user, course, lesson } = require('../controllers');
const { validate, isAdmin, isLecturer, isStudent } = require('../middlewares');

// auth
router.post('/auth/login', auth.login);                        // done
router.get('/auth/whoami', validate, auth.whoami); // done

// user
router.post('/users', validate, isAdmin, user.create); // done ~ only admin can create user
router.get('/users', user.index);
router.get('/users/:id', user.show);
router.post('/users/:id/enrollments', validate, auth.login);

// course 
router.post('/courses', validate, isLecturer, course.create);        // done
router.get('/courses', validate, course.index);          // done
router.get('/courses/:id', validate, course.show);       // done
router.put('/courses/:id', validate, isLecturer, course.update);     // done
router.delete('/courses/:id', validate, isLecturer, course.destroy); // done
// enrollment
router.post('/courses/:id/enroll', validate, isStudent, course.enroll);
router.delete('/courses/:id/unenroll', validate, isStudent, course.unenroll);

// lesson 
router.post('/lessons', validate, isLecturer, lesson.create);        // done
router.get('/lessons', validate, lesson.index);          // done
router.get('/lessons/:id', validate, lesson.show);       // done
router.put('/lessons/:id', validate, isLecturer, lesson.update);     // done
router.delete('/lessons/:id', validate, isLecturer, lesson.destroy); // done
// like
router.get('/lessons/:id/likes', lesson.index); // get lesson likes
router.post('/lessons/:id/likes', lesson.index); // like lesson
router.delete('/lessons/:id/likes', lesson.index); // unlike lesson
// comment
router.get('/lessons/:id/comments', lesson.index); // get lesson comments
router.post('/lessons/:id/comments', lesson.index); // comment lesson
router.put('/lessons/:id/comments/:id', lesson.index); // update comment lesson
router.delete('/lessons/:id/comments/:id', lesson.index); // remove comment lesson

module.exports = router;