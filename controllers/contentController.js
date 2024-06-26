const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query'] });

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

        let contents = await prisma.content.findMany(filter);
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
        // let content = await prisma.content.findUnique({ where: { id: Number(id) } });
        let contents = await prisma.$queryRawUnsafe(`
            SELECT contents.*,
                lessons.course_id,
                (
                    SELECT COUNT(*) FROM likes WHERE content_id = contents.id GROUP BY content_id
                ) likes_count,
                CASE
                    WHEN likes.id IS NOT NULL THEN true
                    ELSE false
                END AS is_liked
            FROM contents
                LEFT JOIN lessons ON lessons.id = contents.lesson_id
                LEFT JOIN likes ON likes.content_id = contents.id AND likes.user_id = ${req.user.id};`);
        if (!contents.length) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'content not found!',
                data: null
            });
        }

        let comments = await prisma.$queryRawUnsafe(`
        SELECT comments.*, users.name AS user_name, users.profile_picture_url
            FROM comments
            INNER JOIN users ON users.id = comments.user_id
        WHERE comments.content_id = ${Number(id)}
        ORDER BY comments.date;`);

        let content = {
            id: contents[0].id,
            title: contents[0].title,
            body: contents[0].body,
            video_url: contents[0].video_url,
            likes_count: Number(contents[0].likes_count),
            likes: contents[0].is_liked,
            lesson_id: contents[0].lesson_id,
            course_id: contents[0].course_id,
            comments: comments.map(c => {
                return {
                    id: c.comment_id,
                    user: {
                        id: c.user_id,
                        name: c.user_name,
                        profile_picture_url: c.profile_picture_url
                    },
                    content: c.comment_content,
                    date: c.comment_date
                };

            })
        };

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

async function like(req, res, next) {
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

        let like = await prisma.like.findFirst({ where: { content_id: content.id, user_id: req.user.id } });
        if (like) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'you already liked this content!',
                data: null
            });
        }

        like = await prisma.like.create({ data: { content_id: content.id, user_id: req.user.id } });

        res.status(201).json({
            status: true,
            message: 'OK',
            error: null,
            data: like
        });
    } catch (err) {
        next(err);
    }
}

async function unlike(req, res, next) {
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

        let like = await prisma.like.findFirst({ where: { content_id: content.id, user_id: req.user.id } });
        if (!like) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'you have not liked this content!',
                data: null
            });
        }

        await prisma.like.delete({ where: { id: like.id } });

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

async function comment(req, res, next) {
    try {
        let { id } = req.params;
        let { content } = req.body;

        let c = await prisma.content.findUnique({ where: { id: Number(id) } });
        if (!c) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'content not found!',
                data: null
            });
        }

        let comment = await prisma.comment.create({ data: { content, user_id: req.user.id, content_id: c.id } });

        res.status(201).json({
            status: true,
            message: 'OK',
            error: null,
            data: comment
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
    watch,
    like,
    unlike,
    comment
};