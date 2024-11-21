import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

const isAuth = async (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json({ error: 'Unauthorized' });
    }   
    
    // toda vez eu farei a requisição ao banco de dados para pegar o usuário ?
    // req.session.user = await prisma.user.findUnique({
    //     where: {
    //         email: req.session.user.email,
    //     },
    //     select: {
    //         // id: true,
    //         email: true,
    //         role: true,
    //     },
    // });


    next();
}

export { isAuth };