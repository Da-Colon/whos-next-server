import express, { Router } from "express";
import { UserPreferencesRoutes } from "../../config/routes";
import * as controller from "./userPreferences.controller";
const userPreferencesRouter = Router();


userPreferencesRouter.get(UserPreferencesRoutes.GetUserPreferences, controller.getPreferences as express.Application)
userPreferencesRouter.put(UserPreferencesRoutes.PutUpdateSelectedList, controller.updateSelectedList as express.Application)
userPreferencesRouter.put(UserPreferencesRoutes.PutUpdateLikedList, controller.updateLikedLists as express.Application)
userPreferencesRouter.put(UserPreferencesRoutes.PutRemoveLikedList, controller.removedLikedList as express.Application)

export const userPreferences = userPreferencesRouter;