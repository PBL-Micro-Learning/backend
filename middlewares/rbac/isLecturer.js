const { Role } = require('@prisma/client');

function isLecturer(req, res, next) {
    if (req.user.role != Role.LECTURER) {
        return res.status(403).json({
            status: false,
            message: 'Forbidden',
            error: 'You are not allowed to access this resource',
            data: null
        });
    }
    next();
}

module.exports = isLecturer;