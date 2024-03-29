const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function create(req, res, next) {
    try {
        let { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'name and description are required!',
                data: null
            });
        }

        let exist = await prisma.Course.findFirst({ where: { name } });
        if (exist) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course name is already used!',
                data: null
            });
        }

        let course = await prisma.Course.create({ data: { name, description } });
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
        let courses = await prisma.Course.findMany();

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
        let course = await prisma.Course.findUnique({ where: { id: Number(id) } });
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