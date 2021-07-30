import { login } from "../../src/core/auth/auth.services";
import { saveUser, User } from "../../src/models/users";
import { testDb } from "../global.spec";

const defaultBody = {
  email: "test@example.com",
  password: "password",
};

export const createUser = async (input = {}) => {
  const userTemplate = User(testDb());

  const userDetails = input?.email ? input : defaultBody;

  return await saveUser(userTemplate, userDetails);
};


export const loginUser = async () => {
  const user = await login(testDb(), defaultBody);
  return user
};
