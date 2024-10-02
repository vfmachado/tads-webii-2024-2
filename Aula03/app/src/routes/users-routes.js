// import com {} importa apenas o Router de dentro do express
import { Router } from 'express';
import { listaUsers } from '../controllers/users-controller.js';

const router = Router();

// pagina lista os usuarios
// router.get('/', (req, res) => {
//     return listaUsers(req, res);
// });
router.get('/', listaUsers);

router.get('/add', (req, res) => {
    res.send("PAGINA COM FORM PARA CADASTRAR UM USUARIO");
});

router.post('/add', (req, res) => {
    res.send("PAGINA COM O RESULTADO DA ADICAO DE UM USUARIO");
});

export default router;