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
        let { search, lecturer_id, is_enrolled } = req.query;

        let query = `
        SELECT
            courses.*,
            users.name AS lecturer_name,
            enrollments.id AS enrollment_id,
            (
                SELECT COUNT(*)
                FROM
                    contents c
                    INNER JOIN lessons l ON l.id = c.lesson_id
                WHERE l.course_id = courses.id
                GROUP BY l.course_id
            ) AS total_contents,
            (
                SELECT COUNT(*)
                FROM
                    contents c
                    INNER JOIN watched_contents wc ON wc.content_id = c.id
                    INNER JOIN lessons l ON l.id = c.lesson_id
                WHERE l.course_id = courses.id AND wc.user_id = ${req.user.id}
                GROUP BY l.course_id
            ) AS watched_contents
        FROM
            courses
            LEFT JOIN enrollments ON enrollments.course_id = courses.id AND enrollments.user_id = ${req.user.id}
            INNER JOIN users ON users.id = courses.lecturer_id
        WHERE 1=1`;

        if (search) {
            query += ` AND (courses.name ILIKE '%${search}%' OR courses.description ILIKE '%${search}%')`;
        }
        if (lecturer_id) {
            query += ` AND courses.lecturer_id = ${parseInt(lecturer_id, 10)}`;
        }
        if (is_enrolled === 'true') {
            query += ` AND enrollments.id IS NOT NULL`;
        }

        let courses = await prisma.$queryRawUnsafe(query);
        courses = courses.map(course => {
            let c = {
                id: course.id,
                name: course.name,
                description: course.description,
                cover_url: course.cover_url,
                lecturer: {
                    id: course.lecturer_id,
                    name: course.lecturer_name
                }
            };
            if (course.enrollment_id) {
                c.is_enrolled = true;
                c.progress = {
                    total_contents: Number(course.total_contents),
                    watched_contents: Number(course.watched_contents),
                    percentage: parseInt(Number(course.watched_contents) / Number(course.total_contents) * 100)
                };
            }
            return c;
        });

        res.status(200).json({
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
            users.name AS lecturer_name,
            enrollments.id AS enrollment_id,

            (
                SELECT COUNT(*)
                FROM
                    contents c
                    INNER JOIN lessons l ON l.id = c.lesson_id
                WHERE l.course_id = courses.id
                GROUP BY l.course_id
            ) AS course_total_contents,
            (
                SELECT COUNT(*)
                FROM
                    contents c
                    INNER JOIN watched_contents wc ON wc.content_id = c.id
                    INNER JOIN lessons l ON l.id = c.lesson_id
                WHERE l.course_id = courses.id AND wc.user_id = ${req.user.id}
                GROUP BY l.course_id
            ) AS course_watched_contents,
            (
                SELECT COUNT(*)
                FROM
                    contents c
                    INNER JOIN lessons l ON l.id = c.lesson_id
                WHERE c.lesson_id = lessons.id
                GROUP BY c.lesson_id
            ) AS lesson_total_contents,
            (
                SELECT COUNT(*)
                FROM
                    contents c
                    INNER JOIN watched_contents wc ON wc.content_id = c.id
                    INNER JOIN lessons l ON l.id = c.lesson_id
                WHERE c.lesson_id = lessons.id AND wc.user_id = ${req.user.id}
                GROUP BY c.lesson_id
            ) AS lesson_watched_contents

        FROM 
            courses
            LEFT JOIN lessons ON lessons.course_id = courses.id
            LEFT JOIN contents ON contents.lesson_id = lessons.id
            INNER JOIN users ON users.id = courses.lecturer_id
            LEFT JOIN enrollments ON enrollments.course_id = courses.id AND enrollments.user_id = ${req.user.id}
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
                let c = {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    cover_url: item.cover_url,
                    lecturer: {
                        id: item.lecturer_id,
                        name: item.lecturer_name
                    },
                    lessons: []
                };
                if (item.enrollment_id) {
                    c.is_enrolled = true;
                    c.progress = {
                        total_contents: Number(item.course_total_contents),
                        watched_contents: Number(item.course_watched_contents),
                        percentage: parseInt(Number(item.course_watched_contents) / Number(item.course_total_contents) * 100)
                    };
                }
                coursesMap.set(item.id, c);
            }

            const course = coursesMap.get(item.id);

            // Find or create the lesson
            const lessonKey = `${item.lesson_id}-${item.id}`;
            if (!lessonsMap.has(lessonKey)) {
                let l = {
                    id: item.lesson_id,
                    title: item.lesson_title,
                    description: item.lesson_description,
                    course_id: item.lesson_course_id,
                    contents: []
                };
                if (item.enrollment_id) {
                    l.progress = {
                        total_contents: Number(item.lesson_total_contents),
                        watched_contents: Number(item.lesson_watched_contents),
                        percentage: parseInt(Number(item.lesson_watched_contents) / Number(item.lesson_total_contents) * 100)
                    };
                }
                lessonsMap.set(lessonKey, l);
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

        res.status(200).json({
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
        res.status(200).json({
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

        let enrollment = await prisma.enrollment.findFirst({ where: { course_id: Number(id), user_id: req.user.id } });
        if (!enrollment) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'not enrolled!',
                data: null
            });
        }

        await prisma.enrollment.delete({ where: { id: enrollment.id } });

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