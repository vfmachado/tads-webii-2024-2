
// NAO FAZ SENTIDO EU CRIAR UM REPOSITORY QUE NAO TEM REGRA DE NEGOCIO...
// NESSE CASO É MAIS FACIL USAR O PADRÃO DO ORM

import { prisma } from "../config/dbconnection.js";

export class UsersRepository {

    // Tipo userTODb

    async saveUser(userToDb) {
        // uma das vantagens é deixar tudo de prisma aqui dentro e nao pra fora do repository
        await prisma.user.create({
            data: userToDb,
        });
    }

    async jaTemEmail(email) {
        console.log({ msg: "cheguei aqui", email})
        const exists = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (exists) return true;
        return false;
    }

    // aqui faz muito sentido pq temos regra junto
    async findActiveUsers() {

    }
}