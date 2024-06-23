const auth = require('./authControllers');
const user = require('./userControllers');
const course = require('./courseControllers');
const lesson = require('./lessonController');

module.exports = {
    auth,
    user,
    course,
    lesson
};