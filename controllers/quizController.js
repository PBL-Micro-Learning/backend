const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function create(req, res, next) {
    try {
        const { lesson_id, title, description } = req.body;
        let lesson = await prisma.lesson.findUnique({ where: { id: Number(lesson_id) } });
        if (!lesson) {
            return res.status(400).json({ status: false, message: 'Bad Request', error: 'lesson not found!', data: null });
        }

        let quiz = await prisma.quiz.findFirst({ where: { lesson_id: lesson.id } });
        if (quiz) {
            return res.status(400).json({ status: false, message: 'Bad Request', error: 'this lesson already has a quiz!', data: null });
        }

        quiz = await prisma.quiz.create({ data: { title, description, lesson_id: lesson.id } });
        return res.status(201).json({ status: true, message: 'Created', error: null, data: quiz });
    } catch (err) {
        next(err);
    }
}

async function index(req, res, next) {
    try {
        let quizzes = await prisma.quiz.findMany();
        return res.status(200).json({ status: true, message: 'OK', error: null, data: quizzes });
    } catch (err) {
        next(err);
    }
}

async function show(req, res, next) {
    try {
        const { id } = req.params;
        const quiz = await prisma.quiz.findUnique({ where: { id: Number(id) } });
        if (!quiz) {
            return res.status(400).json({ status: false, message: 'Bad Request', error: 'quiz not found!', data: null });
        }

        let results = await prisma.$queryRawUnsafe(`
            WITH correct_answers AS (
                SELECT
                    qz.id AS quiz_id,
                    a.user_id,
                    CAST(COUNT(*) AS INTEGER) AS correct_answer_count
                FROM quizzes qz
                INNER JOIN questions q ON q.quiz_id = qz.id
                INNER JOIN answers a ON a.question_id = q.id
                WHERE q.answer = a.mark
                GROUP BY qz.id, a.user_id
            ),
            wrong_answers AS (
                SELECT
                    qz.id AS quiz_id,
                    a.user_id,
                    CAST(COUNT(*) AS INTEGER) AS wrong_answer_count
                FROM quizzes qz
                INNER JOIN questions q ON q.quiz_id = qz.id
                INNER JOIN answers a ON a.question_id = q.id
                WHERE q.answer != a.mark
                GROUP BY qz.id, a.user_id
            ),
            question_counts AS (
                SELECT
                    qz.id AS quiz_id,
                    CAST(COUNT(*) AS INTEGER) AS question_count
                FROM quizzes qz
                INNER JOIN questions q ON q.quiz_id = qz.id
                GROUP BY qz.id
            )
            SELECT
                u.id AS user_id,
                u.name AS user_name,
                COALESCE(qc.question_count, 0) AS question_count,
                COALESCE(ca.correct_answer_count, 0) AS correct_answer_count,
                COALESCE(wa.wrong_answer_count, 0) AS wrong_answer_count,
                COALESCE(CAST((ca.correct_answer_count * 100.0 / NULLIF(qc.question_count, 0)) AS INTEGER), 0) AS correct_answer_ratio
            FROM quizzes q
            INNER JOIN lessons l ON l.id = q.lesson_id
            INNER JOIN enrollments e ON e.course_id = l.course_id
            INNER JOIN users u ON u.id = e.user_id
            LEFT JOIN correct_answers ca ON ca.user_id = u.id AND ca.quiz_id = q.id
            LEFT JOIN wrong_answers wa ON wa.user_id = u.id AND ca.quiz_id = q.id
            LEFT JOIN question_counts qc ON qc.quiz_id = q.id
            WHERE q.id = ${quiz.id};`);

        let questions = await prisma.$queryRawUnsafe(`
            SELECT
                questions.id,
                questions.content,
                options.mark  AS option_mark,
                options.content AS option_content
            FROM
                questions
                INNER JOIN options ON options.question_id = questions.id
            WHERE
                questions.quiz_id = ${Number(id)}
                AND questions.id NOT IN (
                    SELECT questions.id
                    FROM
                        answers
                        INNER JOIN questions ON questions.id = answers.question_id
                    WHERE
                        answers.user_id = ${req.user.id}
                        AND questions.quiz_id = ${Number(id)}
                );`);

        let questionMap = new Map();
        questions.forEach(item => {
            if (!questionMap.has(item.id)) {
                questionMap.set(item.id, {
                    id: item.id,
                    content: item.content,
                    options: []
                });
            }

            questionMap.get(item.id).options.push({
                mark: item.option_mark,
                content: item.option_content
            });
        });

        return res.status(200).json({ status: true, message: 'OK', error: null, data: { ...quiz, results, questions: Array.from(questionMap.values()) } });
    } catch (err) {
        next(err);
    }
}

async function destroy(req, res, next) {
    try {
        const { id } = req.params;
        const quiz = await prisma.quiz.findUnique({ where: { id: Number(id) } });

        if (!quiz) {
            return res.status(400).json({ status: false, message: 'Bad Request', error: 'quiz not found!', data: null });
        }

        await prisma.quiz.delete({ where: { id: Number(id) } });
        return res.status(200).json({ status: true, message: 'Deleted', error: null, data: null });
    } catch (err) {
        next(err);
    }
}

async function getQuestion(req, res, next) {
    try {
        const { id } = req.params;
        if (!Number(id)) return res.status(400).json({ status: false, message: 'Bad Request', error: 'id must be a number!', data: null });

        const quiz = await prisma.quiz.findUnique({ where: { id: Number(id) } });
        if (!quiz) {
            return res.status(400).json({ status: false, message: 'Bad Request', error: 'quiz not found!', data: null });
        }

        let questions = await prisma.$queryRawUnsafe(`
        SELECT
            questions.id,
            questions.content,
            options.mark  AS option_mark,
            options.content AS option_content
        FROM
            questions
            INNER JOIN options ON options.question_id = questions.id
        WHERE
            questions.quiz_id = ${Number(id)}
            AND questions.id NOT IN (
                SELECT questions.id
                FROM
                    answers
                    INNER JOIN questions ON questions.id = answers.question_id
                WHERE
                    answers.user_id = ${req.user.id}
                    AND questions.quiz_id = ${Number(id)}
            );`);

        let questionMap = new Map();
        questions.forEach(item => {
            if (!questionMap.has(item.id)) {
                questionMap.set(item.id, {
                    id: item.id,
                    content: item.content,
                    options: []
                });
            }

            questionMap.get(item.id).options.push({
                mark: item.option_mark,
                content: item.option_content
            });
        });

        // Convert the Map to an array
        let questionArray = Array.from(questionMap.values());
        let question = questionArray[Math.floor(Math.random() * questionArray.length)];

        return res.status(200).json({ status: true, message: 'Success', error: null, data: question });
    } catch (err) {
        next(err);
    }
}

module.exports = { create, index, show, destroy, getQuestion };