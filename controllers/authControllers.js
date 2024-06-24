const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = process.env;

async function login(req, res, next) {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'email and password are required!',
                data: null
            });
        }

        let user = await prisma.User.findFirst({ where: { email } });
        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'invalid email or password!',
                data: null
            });
        }

        let isPasswordCorrect = await bcryt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'invalid email or password!',
                data: null
            });
        }
        delete user.password; // excluede password from user
        let token = jwt.sign(user, JWT_PRIVATE_KEY);

        res.status(200).json({
            status: true,
            message: 'OK',
            error: null,
            data: { ...user, token }
        });
    } catch (err) {
        next(err);
    }
}

async function whoami(req, res) {
    delete req.user.iat;
    res.status(200).json({
        status: true,
        message: 'OK',
        error: null,
        data: {
            ...req.user,
        }
    });
}

module.exports = {
    login,
    whoami
};