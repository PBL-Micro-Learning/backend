const bcrypt = require('bcrypt');
const { PrismaClient, Role, Gender } = require('@prisma/client');
const prisma = new PrismaClient(
    {
        log: ['query'],
    }
);

async function create(req, res, next) {
    try {
        const { name, email, gender, role, password } = req.body;

        if (!name || !email || !role || !password) {
            return res.status(400).json({
                status: false,
                message: 'Missing required fields',
                error: null,
                data: null
            });
        }

        let userRole;
        switch (role) {
            case 'admin':
                userRole = Role.ADMIN;
                break;
            case 'lecturer':
                userRole = Role.LECTURER;
                break;
            case 'student':
                userRole = Role.STUDENT;
                break;
            default:
                return res.status(400).json({
                    status: false,
                    message: 'Invalid role',
                    error: null,
                    data: null
                });
        }

        let userGender;
        switch (gender) {
            case 'male':
                userGender = Gender.MALE;
                break;
            case 'female':
                userGender = Gender.FEMALE;
                break;
            default:
                return res.status(400).json({
                    status: false,
                    message: 'Invalid gender',
                    error: null,
                    data: null
                });
        }

        // check if user already exists
        const userExists = await prisma.user.findFirst({
            where: { email, role: userRole }
        });
        if (userExists) {
            return res.status(400).json({
                status: false,
                message: 'User already exists',
                error: null,
                data: null
            });
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                role: userRole,
                gender: userGender,
                password: await bcrypt.hash(password, 10)
            }
        });

        res.status(201).json({
            status: true,
            message: 'User created',
            error: null,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

async function index(req, res, next) {
    try {
        const { role, search } = req.query;

        let filter = {};
        if (search) {
            filter.where = {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } }
                ]
            };
        }
        if (role) {
            switch (role) {
                case 'admin':
                    filter.where = { ...filter.where, role: Role.ADMIN };
                    break;
                case 'lecturer':
                    filter.where = { ...filter.where, role: Role.LECTURER };
                    break;
                case 'student':
                    filter.where = { ...filter.where, role: Role.STUDENT };
                    break;
                default:
                    break;
            }
        }
        let users = await prisma.user.findMany(filter);
        users = users.map(user => {
            delete user.password;
            return user;
        });

        res.status(200).json({
            status: true,
            message: 'OK',
            error: null,
            data: users
        });
    } catch (error) {
        next(error);
    }
}

async function show(req, res, next) {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'User not found',
                error: null,
                data: null
            });
        }
        delete user.password;

        res.status(200).json({
            status: true,
            message: 'OK',
            error: null,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { create, index, show };