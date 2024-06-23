const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function create(req, res, next) {
    try {
        let { title, description, course_id } = req.body;
        if (!title || !description || !course_id) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'title, description and course_id are required!',
                data: null
            });
        }

        let course = await prisma.course.findFirst({ where: { id: Number(course_id) } });
        if (!course) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course_id not found!',
                data: null
            });
        }
        if (course.lecturer_id != req.user.id) {
            return res.status(403).json({
                status: false,
                message: 'Forbidden',
                error: 'You are not allowed to access this resource',
                data: null
            });
        }

        let exist = await prisma.lesson.findFirst({ where: { title, course_id: course.id } });
        if (exist) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'lesson title is already used!',
                data: null
            });
        }

        let lesson = await prisma.lesson.create({ data: { title, description, course_id: course.id } });
        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: lesson
        });
    } catch (err) {
        next(err);
    }
}

async function index(req, res, next) {
    try {
        let { course_id } = req.query;
        let filter = {};
        if (course_id) {
            filter.where = { course_id: Number(course_id) };
        }

        let lessons = await prisma.lesson.findMany(filter);

        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: lessons
        });
    } catch (err) {
        next(err);
    }
}

async function show(req, res, next) {
    try {
        let { id } = req.params;
        let lesson = await prisma.lesson.findUnique({ where: { id: Number(id) } });
        if (!lesson) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'lesson not found!',
                data: null
            });
        }

        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: lesson
        });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        let { id } = req.params;
        let { title, body } = req.body;

        let lesson = await prisma.lesson.findUnique({ where: { id: Number(id) } });
        if (!lesson) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'lesson not found!',
                data: null
            });
        }

        let course = await prisma.course.findFirst({ where: { id: lesson.course_id } });
        if (!course) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course not found!',
                data: null
            });
        }
        if (course.lecturer_id != req.user.id) {
            return res.status(403).json({
                status: false,
                message: 'Forbidden',
                error: 'You are not allowed to access this resource',
                data: null
            });
        }

        // update
        lesson = await prisma.lesson.update({ where: { id: lesson.id }, data: { title, body } });
        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: lesson
        });
    } catch (err) {
        next(err);
    }
}

async function destroy(req, res, next) {
    try {
        let { id } = req.params;
        let lesson = await prisma.lesson.findUnique({ where: { id: Number(id) } });
        if (!lesson) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'lesson not found!',
                data: null
            });
        }

        let course = await prisma.course.findFirst({ where: { id: lesson.course_id } });
        if (!course) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course not found!',
                data: null
            });
        }
        if (course.lecturer_id != req.user.id) {
            return res.status(403).json({
                status: false,
                message: 'Forbidden',
                error: 'You are not allowed to access this resource',
                data: null
            });
        }

        await prisma.lesson.delete({ where: { id: lesson.id } });
        return res.json({
            status: true,
            message: 'OK',
            error: null,
            data: null
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    create,
    index,
    show,
    update,
    destroy
};