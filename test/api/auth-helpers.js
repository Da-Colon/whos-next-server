import { saveUser, User } from "../../src/models/users";
import { testDb } from "../global.spec";

export const createUser = async (input = {}) => {
  const userTemplate = User(testDb());

  const defaultBody = {
    email: "test@example.com",
    password: "password",
  };

  const userDetails = input?.email ? input : defaultBody;

  return await saveUser(userTemplate, userDetails);
};
