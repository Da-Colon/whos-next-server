import mongoose from "mongoose";
import { addPlugins } from "../database";

const UserPreferenceSchema = new mongoose.Schema(
  {
    likedLists: {
      type: Array,
      default: null
    },
    selectedList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lists",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
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

addPlugins(UserPreferenceSchema);

export const UserPreference = (db) => db.model("UserPreference", UserPreferenceSchema);
export default UserPreference;
