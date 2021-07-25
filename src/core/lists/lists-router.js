import { Router } from "express";
import * as controller from './lists-controller'
const listsRouter = Router();

listsRouter.post("/", controller.createLists);
listsRouter.get("/", () => controller.findListsByUser);
listsRouter.get("/", () => null);
listsRouter.get("/", () => null);
listsRouter.put("/", () => null);
listsRouter.delete("/", () => null);

export const lists = listsRouter;
