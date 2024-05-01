const express = require('express');
const router = express.Router();

const { auth, course, lesson } = require('../controllers');
const { validate } = require('../middlewares');

// auth
router.post('/auth/register', auth.register);                  // done
router.post('/auth/login', auth.login);                        // done
router.get('/auth/whoami', validate, auth.whoami); // done

// user
router.post('/users/:id/enrollments', auth.login);

// course 
router.post('/courses', course.create);        // done
router.get('/courses', course.index);          // done
router.get('/courses/:id', course.show);       // done
router.put('/courses/:id', course.update);     // done
router.delete('/courses/:id', course.destroy); // done
// enrollment
router.post('/courses/:id/enroll', validate, course.enroll);
router.post('/courses/:id/unenroll', validate, course.unenroll);

// lesson 
router.post('/lessons', lesson.create);        // done
router.get('/lessons', lesson.index);          // done
router.get('/lessons/:id', lesson.show);       // done
router.put('/lessons/:id', lesson.update);     // done
router.delete('/lessons/:id', lesson.destroy); // done
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