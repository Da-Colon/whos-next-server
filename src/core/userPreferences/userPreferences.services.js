import Mongoose from "mongoose";
import UserPreferences from "../../models/userPreferences";

export const createUserPreferences = async (db, user) => {
  const template = UserPreferences(db);
  const result = await template.create({
    userId: Mongoose.Types.ObjectId(user.id),
  });
  return result;
};

export const updateUserPreferences = async (db, user, properties) => {
  try {
    const template = UserPreferences(db);
    const result = await template.updateOne(
      { userId: Mongoose.Types.ObjectId(user.id) },
      properties
    );
    if (!result.ok) {
      return { message: "unable to update UserPreferences" };
    }
    return { message: "update Successful" };
  } catch (error) {
    return {
      error: "database error: unable to update UserPreferences",
      orginalError: error,
    };
  }
};

export const getUserPreferences = async (db, user) => {
  try {
    const template = UserPreferences(db);
    const result = await template.findOne({
      userId: Mongoose.Types.ObjectId(user.id),
    });
    
    return result;
  } catch (error) {
    return {
      error: "database error: unable to update UserPreferences",
      orginalError: error,
    };
  }
};
