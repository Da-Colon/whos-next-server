import express, { Router } from "express";
import { AuthRoutes } from "../../config/routes";
import * as controller from "./auth.controller";

const authRouter = Router();

authRouter.post(AuthRoutes.PostLogin, controller.login as express.Application);
authRouter.get(AuthRoutes.GetAuth, controller.auth as express.Application);

export const auth = authRouter;
