import mongoose from "mongoose";
import { addPlugins } from "../database";
import handleError from "../errors";

const ListSchema = new mongoose.Schema(
  {
    lists_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lists",
    },
    name: String,
    private: {
      type: Boolean,
      default: true,
    },
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

addPlugins(ListSchema);

export const List = (db) => db.model("List", ListSchema);
export default List;

// model functions
export const createList = (template, listId, properties) => {
  const { name } = properties;
  const queryParams = {
    name: name,
    lists_id: mongoose.Types.ObjectId(listId),
  };
  return new Promise((resolve, reject) => {
    return template
      .create(queryParams)
      .then(resolve)
      .catch((error) => {
        reject(handleError("database", "create error", error));
      });
  });
};

export const listsByUser = (template, listId) => {
  return new Promise((resolve, reject) => {
    return template
      .find({ lists_id: mongoose.Types.ObjectId(listId) })
      .then(resolve)
      .catch((error) => {
        reject(handleError("database", "failed to retrieve lists", error));
      });
  });
};
export const getAllPublic = (template) => {
  return new Promise((resolve, reject) => {
    return template
      .find({ private: false })
      .then(resolve)
      .catch((error) => {
        reject(
          handleError("database", "failed to retrieve public lists", error)
        );
      });
  });
};

export const updateOne = (template, id, userId) => {
  return new Promise((resolve, reject) => {
    return template
      .updateOne({
        _id: id,
        lists_id: mongoose.Types.ObjectId(userId),
      })
      .then(resolve)
      .catch((error) => {
        reject(handleError("database", "failed to update list", error));
      });
  });
};

export const deleteOne = (template, id, userId) => {
  return new Promise((resolve, reject) => {
    return template
      .delete({
        _id: id,
        lists_id: mongoose.Types.ObjectId(userId),
      })
      .then(resolve)
      .catch((error) => {
        reject(handleError("database", "failed to delete list", error));
      });
  });
};
