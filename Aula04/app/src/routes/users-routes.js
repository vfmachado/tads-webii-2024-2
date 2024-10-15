// import com {} importa apenas o Router de dentro do express
import { Router } from 'express';
import { listaUsers, paginaAddUser, addUser, detalhaUser } from '../controllers/users-controller.js';

const router = Router();

// pagina lista os usuarios
// router.get('/', (req, res) => {
//     return listaUsers(req, res);
// });
router.get('/', listaUsers);

router.get('/:id', detalhaUser);

router.get('/add', paginaAddUser);

router.post('/add', addUser);

export default router;