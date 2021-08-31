import Mongoose from "mongoose";
import handleError from "../../errors";
import Lists from "../../models/lists";

export const create = async (db, user, properties) => {
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

export const findListsByUser = async (db, user) => {
  const listsTemplate = Lists(db);
  return await new Promise((resolve, reject) => {
    return listsTemplate
      .find({ userId: Mongoose.Types.ObjectId(user.id) })
      .then((user) => resolve(user))
      .catch((error) => {
        reject(
          handleError("database", "unable to retrieve lists by user", error)
        );
      });
  });
};

export const getList = async (db, id) => {
  const listsTemplate = Lists(db);
  return new Promise((resolve, reject) => {
    return listsTemplate
      .findOne({
        _id: id,
      })
      .then(resolve)
      .catch((e) => {
        console.error(
          "There was a database error ~ getList ~ /:id ~ services",
          e
        );
        reject();
      });
  });
};

export const updatelistsProperties = async (db, listsId, properties) => {
  const listsTemplate = Lists(db);
  const params = {
    isPrivate: properties.isPrivate,
  };
  if (properties.name) params.name = properties.name;
  if (properties.list) params.list = properties.list;
  return new Promise((resolve, reject) => {
    return listsTemplate
      .updateOne({ _id: listsId }, params)
      .then(resolve)
      .catch((error) => {
        reject(handleError("database", "failed to update", error));
      });
  });
};

export const getPublicLists = (db) => {
  const listsTemplate = Lists(db);
  return new Promise((resolve, reject) => {
    return listsTemplate
      .find({ isPrivate: false })
      .then(resolve)
      .catch((error) => {
        reject(handleError("database", "get all public error", error));
      });
  });
};

export const deleteList = (db, id) => {
  const listsTemplate = Lists(db);
  return new Promise((resolve, reject) => {
    return listsTemplate
      .deleteOne({
        _id: id,
      })
      .then(resolve)
      .catch((error) => {
        reject(handleError("database", "update list error", error));
      });
  });
};
