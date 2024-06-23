const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function create(req, res, next) {
    try {
        let { name, description, cover_url } = req.body;
        if (!name || !description || !cover_url) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'name, cover_url and description are required!',
                data: null
            });
        }

        let exist = await prisma.course.findFirst({ where: { name, lecturer_id: req.user.id } });
        if (exist) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course name is already used!',
                data: null
            });
        }

        let course = await prisma.course.create({
            data: {
                name, description, cover_url, lecturer_id: req.user.id
            }
        });
        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: { course }
        });
    } catch (err) {
        next(err);
    }
}

async function index(req, res, next) {
    try {
        let { search, lecturer_id } = req.query;

        let filter = {};
        if (search) {
            filter.where = {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ]
            };
        }
        if (lecturer_id) {
            filter.where = { ...filter.where, lecturer_id: Number(lecturer_id) };
        }

        const courses = await prisma.course.findMany(filter);

        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: { courses }
        });
    } catch (err) {
        next(err);
    }
}

async function show(req, res, next) {
    try {
        let { id } = req.params;
        let course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course not found!',
                data: null
            });
        }
        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: { course }
        });
    } catch (err) {
        next(err);
    }
}

async function update() {
    try {
        let { id } = req.params;
        let { name, description, cover_url } = req.body;
        if (!name || !description || !cover_url) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'name, cover_url and description are required!',
                data: null
            });
        }

        let course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course not found!',
                data: null
            });
        }
        if (course.lecturer_id !== req.user.id) {
            return res.status(403).json({
                status: false,
                message: 'Forbidden',
                error: 'you are not allowed to update this course!',
                data: null
            });
        }

        course = await prisma.course.update({
            where: { id: Number(id) },
            data: { name, description, cover_url }
        });
        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: { course }
        });
    } catch (error) {
        next(err);
    }
}

async function destroy() {
    try {
        let { id } = req.params;
        let course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course not found!',
                data: null
            });
        }
        if (course.lecturer_id !== req.user.id) {
            return res.status(403).json({
                status: false,
                message: 'Forbidden',
                error: 'you are not allowed to delete this course!',
                data: null
            });
        }

        await prisma.course.delete({ where: { id: Number(id) } });
        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: null
        });
    } catch (err) {
        next(err);
    }
}

async function enroll(req, res, next) {
    try {
        let { id } = req.params;
        let course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course not found!',
                data: null
            });
        }

        let exist = await prisma.Enrollment.findFirst({ where: { course_id: course.id, user_id: req.user.id } });
        if (exist) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'already enrolled!',
                data: null
            });
        }

        let enrollment = await prisma.Enrollment.create({
            data: {
                course_id: course.id,
                user_id: req.user.id
            }
        });

        return res.status(201).json({
            status: true,
            message: 'OK',
            error: null,
            data: null
        });
    } catch (err) {
        next(err);
    }
}

async function unenroll(req, res, next) {
    try {

    } catch (err) {
        next(err);
    }
}

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    enroll,
    unenroll
};