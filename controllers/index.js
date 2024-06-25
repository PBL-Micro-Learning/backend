const auth = require('./authControllers');
const user = require('./userControllers');
const course = require('./courseControllers');
const lesson = require('./lessonController');
const content = require('./contentController');
const quiz = require('./quizController');
const question = require('./questionController');

module.exports = {
    auth,
    user,
    course,
    lesson,
    content,
    quiz,
    question
};