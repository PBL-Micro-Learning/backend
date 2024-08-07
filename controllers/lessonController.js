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
        res.status(200).json({
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

        res.status(200).json({
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

        let quiz = await prisma.quiz.findFirst({ where: { lesson_id: lesson.id } });
        if (quiz) {
            lesson.quiz_id = quiz.id;

            let results = await prisma.$queryRawUnsafe(`
            SELECT
                (
                    SELECT CAST(COUNT(*) AS INTEGER)
                    FROM 
                        quizzes qz
                        INNER JOIN questions q ON q.quiz_id = qz.id
                    WHERE qz.lesson_id = ${Number(id)}
                ) AS quiz_question_count,
                (
                    SELECT CAST(COUNT(*) AS INTEGER)
                    FROM 
                        quizzes qz
                        INNER JOIN questions q ON q.quiz_id = qz.id
                        INNER JOIN answers a ON a.question_id = q.id
                    WHERE q.answer = a.mark AND a.user_id = ${req.user.id} AND qz.lesson_id = ${Number(id)}
                ) AS quiz_correct_answer_count,
                (
                    SELECT CAST(COUNT(*) AS INTEGER)
                    FROM 
                        quizzes qz
                        INNER JOIN questions q ON q.quiz_id = qz.id
                        INNER JOIN answers a ON a.question_id = q.id
                    WHERE q.answer != a.mark AND a.user_id = ${req.user.id} AND qz.lesson_id = ${Number(id)}
                ) AS quiz_wrong_answer_count`);

            lesson.quiz_results = {
                question_count: results[0].quiz_question_count,
                correct_answer_count: results[0].quiz_correct_answer_count,
                wrong_answer_count: results[0].quiz_wrong_answer_count,
                correct_answer_ratio: results[0].quiz_question_count > 0 ? (results[0].quiz_correct_answer_count / results[0].quiz_question_count) * 100 : 0
            };
        } else {
            lesson.quiz_id = null;
        }

        res.status(200).json({
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
        res.status(200).json({
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
        return res.status(200).json({
            status: true,
            message: 'OK',
            error: null,
            data: null
        });
    } catch (err) {
        next(err);
    }
}

async function like(req, res, next) {
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

        let like = await prisma.like.findFirst({ where: { lesson_id: lesson.id, user_id: req.user.id } });
        if (like) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'you already liked this lesson!',
                data: null
            });
        }

        like = await prisma.like.create({ data: { lesson_id: lesson.id, user_id: req.user.id } });
        res.status(200).json({
            status: true,
            message: 'OK',
            error: null,
            data: like
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