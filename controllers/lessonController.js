const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function create(req, res, next) {
    try {
        let { title, body, course_id } = req.body;
        if (!title || !body || !course_id) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'title, body and course_id are required!',
                data: null
            });
        }

        let course = await prisma.Course.findFirst({ where: { id: Number(course_id) } });
        if (!course) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course_id not found!',
                data: null
            });
        }

        let exist = await prisma.Lesson.findFirst({ where: { title, course_id: course.id } });
        if (exist) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'lesson title is already used!',
                data: null
            });
        }

        let lesson = await prisma.Lesson.create({ data: { title, body, course_id: course.id } });
        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: { lesson }
        });
    } catch (err) {
        next(err);
    }
}

async function index(req, res, next) {
    try {
        // let courses = await prisma.Lesson.findMany();

        // res.json({
        //     status: true,
        //     message: 'OK',
        //     error: null,
        //     data: { courses }
        // });
    } catch (err) {
        next(err);
    }
}

async function show(req, res, next) {
    try {
        // let { id } = req.params;
        // let course = await prisma.Lesson.findUnique({ where: { id: Number(id) } });
        // if (!course) {
        //     return res.status(400).json({
        //         status: false,
        //         message: 'Bad Request',
        //         error: 'course not found!',
        //         data: null
        //     });
        // }
        // res.json({
        //     status: true,
        //     message: 'OK',
        //     error: null,
        //     data: { course }
        // });
    } catch (err) {
        next(err);
    }
}

function update() {

}

function destroy() {

}

module.exports = {
    create,
    index,
    show,
    update,
    destroy
};