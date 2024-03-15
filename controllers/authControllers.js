const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcryt = require('bcrypt');

async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'name, email and password are required!',
                data: null
            });
        }

        const existUser = await prisma.User.findFirst({ where: { email } });
        if (existUser) {
            return res.status(400).json({
                status: false,
                message: 'Bad Request',
                error: 'email is already used!',
                data: null
            });
        }

        let encryptedPassword = await bcryt.hash(password, 10);
        const user = await prisma.User.create({ data: { name, email, password: encryptedPassword } });
        delete user.password; // excluede password from user
        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: { user }
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
};