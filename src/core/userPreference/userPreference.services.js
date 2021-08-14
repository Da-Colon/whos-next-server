import { Mongoose } from "mongoose";
import UserPreference from "../../models/userPreference";

export const createUserPreference = async (db, user) => {
  const template = UserPreference(db);
  const result = await template.create({
    userId: Mongoose.Types.ObjectId(user.id),
  });
  return result;
};

export const updatePreferences = async (db, user, properties) => {
  const template = UserPreference(db);
  const result = await template.update(
    { userId: Mongoose.Types.ObjectId(user.id) },
    properties
  );
  if (!result.ok) {
    return { message: "unable to update preference" };
  }
  return { message: "update Successful" };
};

export const getPreferences = async (db, user) => {
  const template = UserPreference(db);
  const result = await template.findOne({ userId: Mongoose.Types.ObjectId(user.id) })
  return result
}