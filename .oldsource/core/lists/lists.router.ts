import express,  { Router } from "express";
import * as controller from "./lists.controller";
import { ListsRoutes } from "../../config/routes";

const listsRouter = Router();

listsRouter.post(ListsRoutes.PostCreateLists, controller.createLists as express.Application);
listsRouter.get(ListsRoutes.GetUserLists, controller.findListsByUser as express.Application);
listsRouter.get(ListsRoutes.GetPublicLists, controller.getPublicLists as express.Application);
listsRouter.get(ListsRoutes.GetList, controller.getList as express.Application);
listsRouter.put(ListsRoutes.PutUpdateList, controller.updateListsProperties as express.Application);
listsRouter.delete(ListsRoutes.DeleteList, controller.deleteList as express.Application);

export const lists = listsRouter;
