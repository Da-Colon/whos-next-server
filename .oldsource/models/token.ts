import mongoose from "mongoose";
import handleError, { ERROR_TYPES } from "../errors";
import { Database } from "../types/database.interface";

const TokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  token: String,
  expirationDate: Date,
});

export const findToken = async (template: mongoose.Model<any>, token: string) => {
  try {
    const response = await template.findOne({ token: token });
    if (!response) handleError(ERROR_TYPES.NOT_FOUND, "Authorization");
    return response;
  } catch (e) {
    // console.error(e)
    return { error: e };
  }
};

export const saveToken = async (template: mongoose.Model<any>, properties: any) => {
  try {
    const response = await template.create(properties);
    if (!response.id) handleError(ERROR_TYPES.UNKNOWN, null, "There was an database error");
    return response;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};

export const deleteToken = async (template: mongoose.Model<any>, id: string, token: string) => {
  try {
    const response: any = await template.deleteOne({ _id: id, token: token });
    if (!response.id) handleError(ERROR_TYPES.UNKNOWN, null, "There was an database error");
    return { message: "ok!" };
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};

export const Token = (db: Database) => db.model("ApiToken", TokenSchema);

export default Token;
