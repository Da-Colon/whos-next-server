import Mongoose from "mongoose";
import UserPreference from "../../models/userPreference";

export const createUserPreference = async (db, user) => {
  const template = UserPreference(db);
  const result = await template.create({
    userId: Mongoose.Types.ObjectId(user.id),
  });
  return result;
};

export const updatePreferences = async (db, user, properties) => {
  try {
    const template = UserPreference(db);
    const result = await template.updateOne(
      { userId: Mongoose.Types.ObjectId(user.id) },
      properties
    );
    if (!result.ok) {
      return { message: "unable to update preference" };
    }
    return { message: "update Successful" };
  } catch (error) {
    return {
      error: "database error: unable to update preference",
      orginalError: error,
    };
  }
};

export const getPreferences = async (db, user) => {
  try {
    const template = UserPreference(db);
    const result = await template.findOne({
      userId: Mongoose.Types.ObjectId(user.id),
    });
    
    return result;
  } catch (error) {
    return {
      error: "database error: unable to update preference",
      orginalError: error,
    };
  }
};
