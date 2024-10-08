// DAO DATA ACCESS OBJECT

// DAO X REPOSITORY
/*

    DAO => RELACIONADO DIRETAMENTE AO BANCO DE DADOS** DA TUA APLICAÇÃO
        LIST USER

    REPOSITORY => RELACIONA OS DADOS COM REGRAS NEGOCIO
        LIST ACTIVE USERS

    PARA MAIORIA DOS CASOS, EXEMPLOS, AULAS, PROJETOS REAIS
        ELES REPRESENTAM A MESMA


    ** PERSISTENCIA DE DADOS


    SERVICE VS REPOSITORY
        SERVICE SE COMPORTA DE MANEIRA PARECIDA COM A DO CONTROLLER EM UM MVC
        O REPOSITORY ELE MISTURA O ACESSO A INFORMAÇÃO (BANCO DE DADOS) COM FILTROS, REGRAS, ETC

*/


import { db } from "../config/database.js";
import { User } from "./user-model.js";

class UserDao {
    list() {
        const stmt = db.prepare('SELECT * FROM users');
        // const stmt = db.prepare('SELECT name, email FROM users');
        const users = stmt.all();
        console.log({ users })
        
        return users;
    }

    save({ name, email, password, createdAt }) {
        const stmt = db.prepare('INSERT INTO users (name, email, password, created_at) VALUES (@name, @email, @password, @createdAt)');
        stmt.run({name, email, password, createdAt});
    }
}

export {
    UserDao
}