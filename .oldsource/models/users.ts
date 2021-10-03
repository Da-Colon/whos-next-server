import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { validate as validEmail } from "email-validator";
import handleError, { ERROR_TYPES } from "../errors";
import { Database } from "../types/database.interface";

export const lookupUser = async (template: any, query: any) => {
  try {
    const response = await template.findOne(query);
    if (!response) return handleError(ERROR_TYPES.NOT_FOUND, "User");
    return response;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};

export const saveUser = async (template: any, properties: any) => {
  try {
    const response = await template.create(properties);
    if (!response) handleError(ERROR_TYPES.UNKNOWN, null, "There was an database error");
    return { message: "User has been registered", user: response };
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};

export const getUsers = async (template: any) => {
  try {
    const res = await template.find();
    if (res.length <= 0) handleError(ERROR_TYPES.NOT_FOUND, "Users");
    return res;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};

export const getUser = async (template: any, userId: string) => {
  try {
    const res = await template.findOne({ _id: userId });
    if (!res) handleError(ERROR_TYPES.NOT_FOUND, "User");
    return res;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};

export const updateUser = async (template: any, id: string, properties: any) => {
  try {
    const res = await template.updateOne({ _id: id }, properties);
    if (!res) handleError(ERROR_TYPES.UNKNOWN, null, "There was an database error");
    return { message: "User has been updated" };
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};

const permissionSchema = {
  admin: { type: Boolean, default: false },
  instructor: { type: Boolean, default: false },
};
const emailSchema = {
  type: String,
  required: false,
  unique: true,
  set: (v: string) => v.toLowerCase(),
  validate: { validator: (v: string) => validEmail(v), message: "email invalid format" },
};
const passwordSchema = { type: String, required: false, set: (v: string) => generatePassword(v) };
// generate password hash
const generatePassword = (password: string) => {
  const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_COST as string, 10));
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

// validate password
export const validatePassword = (providedPassword: string, password: string) => {
  return bcrypt.compare(providedPassword, password);
};

const UserSchema = new mongoose.Schema(
  {
    permissions: permissionSchema,
    email: emailSchema,
    password: passwordSchema,
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

export const User = (db: Database) => db.model("User", UserSchema);

export default User;
