import { Router } from 'express';
import controller from './users.controller'

const usersRouter = Router();
usersRouter.post('/', controller.create)

export const users = usersRouter;