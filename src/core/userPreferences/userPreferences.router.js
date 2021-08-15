import { Router } from "express";
import * as controller from "./userPreferences.controller";
const userPreferencesRouter = Router();


userPreferencesRouter.put('/select/:listId', controller.updateSelectedList)
userPreferencesRouter.put('/like/:listId', controller.updateLikedLists)
userPreferencesRouter.put('/unlike/:listId', controller.removedLikedList)
userPreferencesRouter.get('/', controller.getPreferences)

export const userPreferences = userPreferencesRouter;