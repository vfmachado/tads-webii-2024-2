/*
ROUTER e CONTROLLER representam algo muito semelhante na maioria dos frameworks
*/

import { UsersService } from "./users.service.js";

// CONTROLLER TRATA A REQUISIÇÃO, 
    // TRATAR O REQUEST -> PODE SIGNIFICAR TBM VERIFICAR SE PREENCHE OS REQUISITOS
    // VALIDAÇÃO DE INPUT
// PASSA A RESPONSABILIDADE DA REGRA DE NEGOCIO
// RETORNA A RESPOSTA
export class UsersController {

    usersService = new UsersService();

    async create(req, res) {
        const user = req.body;
        // TODO validar o payload
        try {
            const result =  await this.usersService.create(user);
            return res.status(201).send();
        } catch (error) {
            console.error(error);
            return res.status(400).send(error.message);
        }
    }

}


// export routes