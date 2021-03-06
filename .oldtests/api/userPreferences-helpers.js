import { testDb } from "../global.spec";
import * as userPreferencesServices from "../../src/core/userPreferences/userPreferences.services.ts";

export const getUserPreferences = async (user) => {
  const result = await userPreferencesServices.getUserPreferences(testDb(), user);
  return result;
};
