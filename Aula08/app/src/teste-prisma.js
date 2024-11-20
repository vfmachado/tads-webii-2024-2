import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

async function todosComInclude() {
    console.log("FUNCIONA");
    const users = await prisma.user.findMany({
        include: {
            posts: true,
        }   
    });
    console.log(JSON.stringify(users, null, 2));
}

async function filtraPeloNome() {
    const users = await prisma.user.findMany({
        where: {
            name: {
                contains: 'vini'
            },
        },
    });
    console.log(JSON.stringify(users, null, 2));
}

async function addPostParaUser(userId, data) {
    const post = await prisma.post.create({
        data: {
            authorId: userId,
            ...data,
        },
    });
}

// addPostParaUser(2, { 
//     message: 'Post de teste',
// });

async function apenasNomes() {
    const users = await prisma.user.findMany({
        select: {
            name: true,
        },
    });
    console.log(JSON.stringify(users, null, 2));
}

// todosComInclude();

async function buscaPeloUserId(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            posts: true,
            comments: {
                include: {
                    post: {
                        include: {
                            author: true,
                        }
                    },
                },
            }
        },
    });
    console.log(JSON.stringify(user, null, 2));
}

// buscaPeloUserId(1);

async function usersPaginados(page, take) {
    const users = await prisma.user.findMany({
        skip: page * take,
        take: take,
    });
    console.log(JSON.stringify(users, null, 2));
}

usersPaginados(0, 2);
usersPaginados(1, 2);