import { testDb } from "../global.spec";
import * as userPreferencesServices from "../../src/core/userPreference/userPreference.services";

export const getUserPreferences = async (user) => {
  const result = await userPreferencesServices.getPreferences(testDb(), user);
  return result;
};
