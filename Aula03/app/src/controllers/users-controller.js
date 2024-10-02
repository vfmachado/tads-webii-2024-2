import { UserDao } from "../models/user-dao.js";
import { User } from "../models/user-model.js";

function listaUsers(req, res) {
    const userDao = new UserDao();
    const users = userDao.list();

    const data = {
        title: "WEB II",
        names: users.map(u => u.name)
    }
    res.render('users-listagem', { data });
    // o return é opcional aqui, cuidado para nao dar dois renders ao mesmo tempo
}

export {
    listaUsers
};
