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

        return res.status(200).json({ status: true, message: 'OK', error: null, data: { ...quiz, questions: Array.from(questionMap.values()) } });
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