import { Router } from "express";
import * as controller from "./lists.controller";
const listsRouter = Router();

listsRouter.post("/", controller.createLists);
listsRouter.get("/user", controller.findListsByUser);
listsRouter.get("/public", controller.getPublicLists);
listsRouter.get("/:id", controller.getList);
listsRouter.put("/:id", controller.updateListsProperties);
listsRouter.delete("/:id", controller.deleteList);

export const lists = listsRouter;
