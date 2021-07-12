import handleError, { ERROR_TYPES } from "../errors";
import Lists, { addToLists, findListsByUser } from "../models/lists";

exports.addToLists = async (db, user) => {
  try {
    const listsTemplate = Lists(db);
    const addToListsResponse = await addToLists(listsTemplate, user);
    return addToListsResponse;
  } catch {
    return handleError(
      ERROR_TYPES.UNKNOWN,
      "services",
      "create error"
    );
  }
};

exports.findListsByUser = async (db, user) => {
  try {
    const listsTemplate = Lists(db);
    const listsResponse = await findListsByUser(listsTemplate, user.id)
    return listsResponse
  } catch {
    return handleError(
      ERROR_TYPES.UNKNOWN,
      "services",
      "There was an service error"
    );
  }
};

exports.getPublicLists = () => {};

exports.getList = () => {};

exports.deleteList = () => {};
