import { PrismaClient } from '@prisma/client'
import jsonwebtoken from 'jsonwebtoken';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

const isAuth = async (req, res, next) => {
    // valida jwt e insere o usuario no req
    const token = req.headers.authorization?.split(' ')[1] ?? null;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const user = jsonwebtoken.verify(token, process.env.APP_SECRET);
        console.log({ user });
        req.user = user;
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

export { isAuth };