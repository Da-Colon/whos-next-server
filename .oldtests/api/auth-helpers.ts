import { login } from "../../src/core/auth/auth.services";
import * as  usersServices from '../../src/core/users/users.services'
import { LoginParams } from "../../src/types/auth.interface";
import { testDb } from "../global.spec";

const defaultBody = {
  email: "test@example.com",
  password: "password",
};

export const createUser = async (input = {} as LoginParams) => {
  const userDetails = input?.email ? input : defaultBody;
  const result = usersServices.create(testDb(), userDetails)
  return result
};


export const loginUser = async (input = {} as LoginParams) => {
  const result = await login(testDb(), input?.email ? input : defaultBody);
  return result
};
