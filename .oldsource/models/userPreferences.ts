import mongoose from "mongoose";
import { addPlugins } from "../database";
import { Database } from "../types/database.interface";

const UserPreferencesSchema = new mongoose.Schema(
  {
    likedLists: {
      type: Array,
      default: null,
    },
    selectedList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lists",
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

addPlugins(UserPreferencesSchema);

export const UserPreferences = (db: Database) => db.model("UserPreferences", UserPreferencesSchema);
export default UserPreferences;
