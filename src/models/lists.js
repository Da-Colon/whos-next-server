import mongoose from "mongoose";
import { addPlugins } from "../database";
import handleError from "../errors";

const ListsSchema = new mongoose.Schema(
  {
    private: {
      type: Boolean,
      default: true,
    },
    list_name: {
      type: String,
      require: true,
    },
    user_id: {
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

// model functions
export const addToLists = (user, template, properties) => {
  const { listName } = properties;
  const paramData = {
    list_name: listName,
    user_id: user.id,
  };
  return new Promise((resolve, reject) => {
    template
      .create(paramData)
      .then(resolve)
      .catch((error) => {
        reject(handleError("database", "create error", error));
      });
  });
};

export const findListsByUser = (template, userId) => {
  return new Promise((resolve, reject) => {
    template
      .find({ user_id: mongoose.Schema.ObjectId(userId) })
      .then(resolve)
      .catch((error) => {
        reject(handleError("database", "unable to retrieve lists by user", error));
      });
  });
};

export const getAllPublic = (template) => {
  return new Promise((resolve, reject) => {
    template
      .find({ private: false })
      .then(resolve)
      .catch((error) => {
        reject(handleError("database", "get all public error", error));
      });
  });
};

export const deleteOne = (template, id, userId) => {
  return new Promise((resolve, reject) => {
    template
      .delete({
        _id: id,
        user_id: mongoose.Schema.Types.ObjectId(userId),
      })
      .then(resolve)
      .catch((error) => {
        reject(handleError("database", "update list error", error));
      });
  });
};
