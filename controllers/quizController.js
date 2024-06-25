const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function create(req, res, next) {
    try {
        const { lesson_id, title, description } = req.body;
        let lesson = await prisma.lesson.findUnique({
            where: {
                id: Number(lesson_id)
            }
        });
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
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'this lesson already has a quiz!',
                data: null
            });
        }

        quiz = await prisma.quiz.create({
            data: {
                title,
                description,
                lesson_id: lesson.id
            }
        });

        return res.status(201).json({
            status: true,
            message: 'Created',
            error: null,
            data: quiz
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { create };