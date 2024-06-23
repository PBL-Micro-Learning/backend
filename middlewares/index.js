const validate = require('./auth/validate');
const isAdmin = require('./rbac/isAdmin');
const isLecturer = require('./rbac/isLecturer');
const isStudent = require('./rbac/isStudent');

module.exports = {
    validate, isAdmin, isLecturer, isStudent
};