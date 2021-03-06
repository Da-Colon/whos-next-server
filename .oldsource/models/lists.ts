import mongoose from "mongoose";
import { addPlugins } from "../database";
import { Database } from "../types/database.interface";

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
    likes: {
      type: Number,
      default: 0
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lists",
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
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

addPlugins(ListsSchema);

export const Lists = (db: Database) => db.model("Lists", ListsSchema);
export default Lists;
