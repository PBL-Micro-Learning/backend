const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query'] });

async function create(req, res, next) {
    try {
        let { name, description, cover_url } = req.body;
        if (!name || !description || !cover_url) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'name, cover_url and description are required!',
                data: null
            });
        }

        let exist = await prisma.course.findFirst({ where: { name, lecturer_id: req.user.id } });
        if (exist) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course name is already used!',
                data: null
            });
        }

        let course = await prisma.course.create({
            data: {
                name, description, cover_url, lecturer_id: req.user.id
            }
        });
        res.status(201).json({
            status: true,
            message: 'OK',
            error: null,
            data: course
        });
    } catch (err) {
        next(err);
    }
}

async function index(req, res, next) {
    try {
        let { search, lecturer_id } = req.query;

        let query = `
        SELECT
            courses.*,
            users.name AS lecturer_name
        FROM
            courses
        INNER JOIN
            users ON users.id = courses.lecturer_id
        WHERE 1=1`;

        if (search) {
            query += ` AND (courses.name ILIKE '%${search}%' OR courses.description ILIKE '%${search}%')`;
        }
        if (lecturer_id) {
            query += ` AND courses.lecturer_id = ${parseInt(lecturer_id, 10)}`;
        }

        let courses = await prisma.$queryRawUnsafe(query);
        courses = courses.map(course => {
            return {
                id: course.id,
                name: course.name,
                description: course.description,
                cover_url: course.cover_url,
                lecturer: {
                    id: course.lecturer_id,
                    name: course.lecturer_name
                }
            };
        });

        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: courses
        });
    } catch (err) {
        next(err);
    }
}

async function show(req, res, next) {
    try {
        let { id } = req.params;

        let course = await prisma.$queryRawUnsafe(`
        SELECT 
            courses.id,
            courses.name,
            courses.description,
            courses.cover_url,

            lessons.id AS lesson_id,
            lessons.title AS lesson_title,
            lessons.description AS lesson_description,
            lessons.course_id AS lesson_course_id,

            contents.id AS content_id,
            contents.title AS content_title,
            contents.body AS content_body,
            contents.video_url AS content_video_url,
            contents.lesson_id AS content_lesson_id,

            courses.lecturer_id,
            users.name AS lecturer_name

        FROM 
            courses
            LEFT JOIN lessons ON lessons.course_id = courses.id
            LEFT JOIN contents ON contents.lesson_id = lessons.id
            INNER JOIN users ON users.id = courses.lecturer_id
        WHERE
            courses.id = ${Number(id)};`);

        if (!course.length) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course not found!',
                data: null
            });
        }

        const coursesMap = new Map();
        const lessonsMap = new Map();
        course.forEach(item => {
            // Find or create the course
            if (!coursesMap.has(item.id)) {
                coursesMap.set(item.id, {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    cover_url: item.cover_url,
                    lecturer: {
                        id: item.lecturer_id,
                        name: item.lecturer_name
                    },
                    lessons: []
                });
            }

            const course = coursesMap.get(item.id);

            // Find or create the lesson
            const lessonKey = `${item.lesson_id}-${item.id}`;
            if (!lessonsMap.has(lessonKey)) {
                lessonsMap.set(lessonKey, {
                    id: item.lesson_id,
                    title: item.lesson_title,
                    description: item.lesson_description,
                    course_id: item.lesson_course_id,
                    contents: []
                });
                course.lessons.push(lessonsMap.get(lessonKey));
            }

            const lesson = lessonsMap.get(lessonKey);

            // Add content to the lesson
            lesson.contents.push({
                id: item.content_id,
                title: item.content_title,
                body: item.content_body,
                video_url: item.content_video_url
            });
        });

        // Convert the courses map to an array
        const response = Array.from(coursesMap.values());

        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: response[0]
        });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        let { id } = req.params;
        let { name, description, cover_url } = req.body;
        if (!name || !description || !cover_url) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'name, cover_url and description are required!',
                data: null
            });
        }

        let course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course not found!',
                data: null
            });
        }
        if (course.lecturer_id !== req.user.id) {
            return res.status(403).json({
                status: false,
                message: 'Forbidden',
                error: 'you are not allowed to update this course!',
                data: null
            });
        }

        course = await prisma.course.update({
            where: { id: Number(id) },
            data: { name, description, cover_url }
        });
        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: course
        });
    } catch (error) {
        next(err);
    }
}

async function destroy(req, res, next) {
    try {
        let { id } = req.params;
        let course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course not found!',
                data: null
            });
        }
        if (course.lecturer_id !== req.user.id) {
            return res.status(403).json({
                status: false,
                message: 'Forbidden',
                error: 'you are not allowed to delete this course!',
                data: null
            });
        }

        await prisma.course.delete({ where: { id: Number(id) } });
        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: null
        });
    } catch (err) {
        next(err);
    }
}

async function enroll(req, res, next) {
    try {
        let { id } = req.params;
        let course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'course not found!',
                data: null
            });
        }

        let exist = await prisma.enrollment.findFirst({ where: { course_id: course.id, user_id: req.user.id } });
        if (exist) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'already enrolled!',
                data: null
            });
        }

        let enrollment = await prisma.enrollment.create({
            data: {
                course_id: course.id,
                user_id: req.user.id
            }
        });

        return res.status(201).json({
            status: true,
            message: 'OK',
            error: null,
            data: enrollment
        });
    } catch (err) {
        next(err);
    }
}

async function unenroll(req, res, next) {
    try {
        let { id } = req.params;

        let exist = await prisma.enrollment.findFirst({ where: { course_id: course.id, user_id: req.user.id } });
        if (!exist) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'not enrolled!',
                data: null
            });
        }

        await prisma.enrollment.delete({ where: { course_id: course.id, user_id: req.user.id } });

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

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    enroll,
    unenroll
};