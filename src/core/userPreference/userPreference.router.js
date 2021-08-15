import { Router } from "express";
import * as controller from "./userPreference.controller";
const userPreferenceRouter = Router();


userPreferenceRouter.put('/select/:listId', controller.updateSelectedList)
userPreferenceRouter.put('/like/:listId', controller.updateLikedLists)
userPreferenceRouter.put('/unlike/:listId', controller.removedLikedList)
userPreferenceRouter.get('/', controller.getPreferences)

export const userPreference = userPreferenceRouter;