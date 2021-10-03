import handleError, { ERROR_TYPES } from "../../errors";
import User, { getUser, getUsers, saveUser, updateUser } from "../../models/users";
import { Database } from "../../types/database.interface";
import { UserParams, UserUpdateProperties } from "../../types/users.interface";
import { createUserPreferences } from "../userPreferences/userPreferences.services";

export const create = async (db: Database, properties: UserParams) => {
  try {
    if (!properties.email) handleError(ERROR_TYPES.BAD_REQUEST, null, "Email is Required");
    if (!properties.password) handleError(ERROR_TYPES.BAD_REQUEST, null, "Password is Required");

    const template = User(db);
    const res = await saveUser(template, properties);
    if (res.user) {
      await createUserPreferences(db, res.user);
    }
    return res;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};

export const getAll = async (db: Database) => {
  try {
    const template = User(db);
    const res = await getUsers(template);
    if (res) return res;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};

export const getOne = async (db: Database, id: string) => {
  try {
    if (!id || id.length < 5) return handleError(ERROR_TYPES.BAD_REQUEST, null);

    const template = User(db);
    const res = await getUser(template, id);
    return res;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};

export const update = async (db: Database, id: string, properties: UserUpdateProperties) => {
  try {
    if (!id || id.length < 5) handleError(ERROR_TYPES.BAD_REQUEST, null);
    const { email, password, permissions } = properties;
    const props: UserUpdateProperties = {};

    // Add User Authenication
    if (email) props.email = email;
    if (password) props.password = password;

    // Add Admin Authenication
    if (permissions) props.permissions = permissions;

    // handle no properties
    if (Object.keys(props).length === 0) handleError(ERROR_TYPES.BAD_REQUEST, null);

    const template = await User(db);
    const res = updateUser(template, id, props);
    return res;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};
