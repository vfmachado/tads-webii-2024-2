import { UsersRepository } from "./users.repository.js";
import bcrypt from 'bcrypt'

export class UsersService {

    // ALGUNS FRAMEWORKS INJETAM O REPOSITORY NO SERVICE

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async create(user) {
        console.log({ 
            repository: this.usersRepository,
            user 
        })
        // validar se o email nao esta sendo utilizado
        const exists = await this.usersRepository.jaTemEmail(user.email);
        if (exists) {
            throw new Error("USUARIO JA EXISTE");
        }

        // encriptar senha
        const encrypted = bcrypt.hashSync("CHAVE" + user.password, 10);
    
        // criar um usuario no banco
        await this.usersRepository.saveUser({
            ...user,
            password: encrypted
        })

        // devolver alguma resposta

    }


}