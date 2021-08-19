import { Router } from "express";
import * as controller from "./userPreferences.controller";
const userPreferencesRouter = Router();


userPreferencesRouter.get('/', controller.getPreferences)
userPreferencesRouter.put('/select/:listId', controller.updateSelectedList)
userPreferencesRouter.put('/like/:listId', controller.updateLikedLists)
userPreferencesRouter.put('/unlike/:listId', controller.removedLikedList)

export const userPreferences = userPreferencesRouter;