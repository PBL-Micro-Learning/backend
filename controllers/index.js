const auth = require('./authControllers');
const user = require('./userControllers');
const course = require('./courseControllers');
const lesson = require('./lessonController');
const content = require('./contentController');

module.exports = {
    auth,
    user,
    course,
    lesson,
    content
};