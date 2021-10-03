import Mongoose from "mongoose";
import handleError from "../../errors";
import Lists from "../../models/lists";
import { Database } from "../../types/database.interface";
import { ListsParams } from "../../types/lists.interface";
import { User } from "../../types/models.interface";

// rethink error handling and structure of controller
// make as readable as possible
// change to async/await
export const create = async (db: Database, user: User, properties: ListsParams) => {
  const listsTemplate = Lists(db);
  const { name, list, isPrivate } = properties;
  const paramData = {
    name: name,
    list: list,
    userId: Mongoose.Types.ObjectId(user.id),
    isPrivate: isPrivate,
  };
  return new Promise((resolve, reject) => {
    return listsTemplate
      .create(paramData)
      .then(resolve)
      .catch(() => {
        reject(() => ({ error: "There was an error creating" }));
      });
  });
};

export const findListsByUser = async (db: Database, user: User) => {
  const listsTemplate = Lists(db);
  return await new Promise((resolve, reject) => {
    return listsTemplate
      .find({ userId: Mongoose.Types.ObjectId(user.id) })
      .then((user: User) => resolve(user))
      .catch((error: any) => {
        reject(handleError("database", "unable to retrieve lists by user", error));
      });
  });
};

export const getList = async (db: Database, id: string) => {
  const listsTemplate = Lists(db);
  return new Promise((resolve, reject) => {
    return listsTemplate
      .findOne({
        _id: id,
      })
      .then(resolve)
      .catch((e: any) => {
        console.error("There was a database error ~ getList ~ /:id ~ services", e);
        reject();
      });
  });
};

export const updatelistsProperties = async (db: Database, listsId: string, properties: ListsParams) => {
  const listsTemplate = Lists(db);
  const params: ListsParams = {
    isPrivate: properties.isPrivate,
  };
  if (properties.name) params.name = properties.name;
  if (properties.list) params.list = properties.list;
  return new Promise((resolve, reject) => {
    return listsTemplate
      .updateOne({ _id: listsId }, params)
      .then(resolve)
      .catch((error: any) => {
        reject(handleError("database", "failed to update", error));
      });
  });
};

export const getPublicLists = (db: Database) => {
  const listsTemplate = Lists(db);
  return new Promise((resolve, reject) => {
    return listsTemplate
      .find({ isPrivate: false })
      .then(resolve)
      .catch((error: any) => {
        reject(handleError("database", "get all public error", error));
      });
  });
};

export const deleteList = (db: Database, id: string) => {
  const listsTemplate = Lists(db);
  return new Promise((resolve, reject) => {
    return listsTemplate
      .deleteOne({
        _id: id,
      })
      .then(resolve)
      .catch((error: any) => {
        reject(handleError("database", "update list error", error));
      });
  });
};
