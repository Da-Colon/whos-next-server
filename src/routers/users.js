import { Router } from 'express';
import controller from '../controllers/users'

const usersRouter = Router();
usersRouter.post('/', controller.create)

export const users = usersRouter;