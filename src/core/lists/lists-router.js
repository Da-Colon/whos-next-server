import { Router } from "express";
import * as controller from './lists-controller'
const listsRouter = Router();

listsRouter.post("/", controller.createLists);
listsRouter.get("/", controller.findListsByUser);
// listsRouter.get("/:id", () => null);
// listsRouter.get("/", () => null);
listsRouter.put("/", () => null);
listsRouter.delete("/", () => null);

export const lists = listsRouter;
