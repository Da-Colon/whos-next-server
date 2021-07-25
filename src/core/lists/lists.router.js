import { Router } from "express";
import Controller from './lists-controller'
const listRouter = Router();

listRouter.post("/", Controller.createList);
listRouter.get("/", () => null);
listRouter.get("/", () => null);
listRouter.get("/", () => null);
listRouter.put("/", () => null);
listRouter.delete("/", () => null);

export const auth = listRouter;