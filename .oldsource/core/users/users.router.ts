import express, { Router } from "express";
import { UsersRoutes } from "../../config/routes";
import controller from "./users.controller";

const usersRouter = Router();
usersRouter.post(UsersRoutes.PostCreateUser, controller.create as express.Application);

export const users = usersRouter;
