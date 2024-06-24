const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function create(req, res, next) {
    try {
        let { title, body, video_url, lesson_id } = req.body;
        if (!title || !body || !video_url || !lesson_id) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'title, body, video_url and lesson_id are required!',
                data: null
            });
        }

        let lesson = await prisma.lesson.findFirst({ where: { id: Number(lesson_id) } });
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

        let exist = await prisma.content.findFirst({ where: { title, lesson_id: lesson.id } });
        if (exist) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'content title is already used!',
                data: null
            });
        }

        let content = await prisma.content.create({ data: { title, body, video_url, lesson_id: lesson.id } });
        res.status(201).json({
            status: true,
            message: 'OK',
            error: null,
            data: content
        });
    } catch (err) {
        next(err);
    }
}

async function index(req, res, next) {
    try {
        let { lesson_id } = req.query;
        let filter = {};
        if (lesson_id) {
            filter.where = { lesson_id: Number(lesson_id) };
        }

        let contents = await prisma.lesson.findMany(filter);
        res.status(200).json({
            status: true,
            message: 'OK',
            error: null,
            data: contents
        });
    } catch (err) {
        next(err);
    }
}

async function show(req, res, next) {
    try {
        let { id } = req.params;
        let content = await prisma.content.findUnique({ where: { id: Number(id) } });
        if (!content) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'content not found!',
                data: null
            });
        }

        res.status(200).json({
            status: true,
            message: 'OK',
            error: null,
            data: content
        });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        let { id } = req.params;
        let { title, body, video_url } = req.body;

        let content = await prisma.content.findUnique({ where: { id: Number(id) } });
        if (!content) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'content not found!',
                data: null
            });
        }

        let lesson = await prisma.lesson.findFirst({ where: { id: content.lesson_id } });
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

        content = await prisma.content.update({ where: { id: content.id }, data: { title, body, video_url } });
        res.status(200).json({
            status: true,
            message: 'OK',
            error: null,
            data: content
        });
    } catch (err) {
        next(err);
    }
}

async function destroy(req, res, next) {
    try {
        let { id } = req.params;
        let content = await prisma.content.findUnique({ where: { id: Number(id) } });
        if (!content) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'content not found!',
                data: null
            });
        }

        let lesson = await prisma.lesson.findFirst({ where: { id: content.lesson_id } });
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

        await prisma.content.delete({ where: { id: content.id } });
        res.status(200).json({
            status: true,
            message: 'OK',
            error: null,
            data: null
        });
    } catch (err) {
        next(err);
    }
}

async function watch(req, res, next) {
    try {
        let { id } = req.params;
        let content = await prisma.content.findUnique({ where: { id: Number(id) } });
        if (!content) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'content not found!',
                data: null
            });
        }

        let watchedContent = await prisma.watchedContent.findFirst({ where: { user_id: req.user.id, content_id: content.id } });
        if (watchedContent) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'content already watched!',
                data: null
            });
        }

        watchedContent = await prisma.watchedContent.create({ data: { user_id: req.user.id, content_id: content.id } });

        res.status(201).json({
            status: true,
            message: 'OK',
            error: null,
            data: watchedContent
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
    destroy,
    watch
};