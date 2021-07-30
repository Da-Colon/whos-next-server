import mongoose from "mongoose";
import { addPlugins } from "../database";

const ListsSchema = new mongoose.Schema(
  {
    isPrivate: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      require: true,
    },
    list: {
      type: Array,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

addPlugins(ListsSchema);

export const Lists = (db) => db.model("Lists", ListsSchema);
export default Lists;
