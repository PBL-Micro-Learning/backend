const { PrismaClient, AnswerOptions } = require('@prisma/client');
const prisma = new PrismaClient();

async function create(req, res, next) {
    try {
        const { quiz_id, content, options } = req.body;
        const quiz = await prisma.quiz.findUnique({ where: { id: Number(quiz_id) } });

        if (!quiz) {
            return res.status(400).json({ status: false, message: 'Bad Request', error: 'quiz not found!', data: null });
        }

        if (options.length !== 4) {
            return res.status(400).json({ status: false, message: 'Bad Request', error: 'options must be 4!', data: null });
        }

        const correctOptions = options.filter(o => o.is_correct);
        console.log("correctOptions:", correctOptions);
        if (correctOptions.length !== 1) {
            return res.status(400).json({ status: false, message: 'Bad Request', error: 'options must have one correct answer!', data: null });
        }

        const marks = [AnswerOptions.A, AnswerOptions.B, AnswerOptions.C, AnswerOptions.D];
        let answer;

        options.forEach((o, i) => {
            o.mark = marks[i];
            if (o.is_correct) {
                answer = o.mark;
            }
        });

        const question = await prisma.question.create({
            data: { quiz_id: quiz.id, content, answer }
        });

        await Promise.all(options.map(o =>
            prisma.option.create({
                data: {
                    question_id: question.id,
                    content: o.content,
                    mark: o.mark,
                }
            })
        ));

        return res.status(201).json({ status: true, message: 'Created', error: null, data: null });
    } catch (err) {
        next(err);
    }
}

async function destroy(req, res, next) {
    try {
        const { id } = req.params;
        const question = await prisma.question.findUnique({ where: { id: Number(id) } });

        if (!question) {
            return res.status(400).json({ status: false, message: 'Bad Request', error: 'question not found!', data: null });
        }

        await prisma.option.deleteMany({ where: { question_id: question.id } });
        await prisma.question.delete({ where: { id: question.id } });

        return res.status(200).json({ status: true, message: 'Deleted', error: null, data: null });
    } catch (err) {
        next(err);
    }
}

async function answer(req, res, next) {
    try {
        const { id } = req.params;
        const { mark } = req.body;
        const question = await prisma.question.findUnique({ where: { id: Number(id) } });
        if (!question) {
            return res.status(400).json({ status: false, message: 'Bad Request', error: 'question not found!', data: null });
        }

        const marks = [AnswerOptions.A, AnswerOptions.B, AnswerOptions.C, AnswerOptions.D];
        if (!marks.includes(mark)) {
            return res.status(400).json({ status: false, message: 'Bad Request', error: 'invalid answer!', data: null });
        }

        let answered = await prisma.answer.findFirst({ where: { user_id: req.user.id, question_id: question.id } });
        if (answered) {
            return res.status(400).json({ status: false, message: 'Bad Request', error: 'question already answered!', data: null });
        }

        await prisma.answer.create({
            data: {
                user_id: req.user.id,
                question_id: question.id,
                mark
            }
        });

        return res.status(200).json({ status: true, message: 'Correct', error: null, data: null });
    } catch (err) {
        next(err);
    }
}


module.exports = { create, destroy, answer };