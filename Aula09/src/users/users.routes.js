import { Router } from 'express';
import { UsersController } from './users.controller.js';

const usersRoutes = Router();

const controller = new UsersController();

usersRoutes.post('/', (req, res) => {
    return controller.create(req, res);
});
// router.post('/', controller.create(req, res));


export { usersRoutes };