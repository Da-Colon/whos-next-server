import handleError, { ERROR_TYPES } from "../../errors";
import Lists, { addToLists as createList, findListsByUser as findLists } from "../../models/lists";

export const addToLists = async (db, user, properties) => {
  try {
    const listsTemplate = Lists(db);
    const addToListsResponse = await createList(
      listsTemplate,
      user,
      properties
    );
    return addToListsResponse;
  } catch {
    return handleError(ERROR_TYPES.UNKNOWN, "services", "create error");
  }
};

export const findListsByUser = async (db, user) => {
    const listsTemplate = Lists(db);
    const listsResponse = await findLists(listsTemplate, user.id);
    return listsResponse;
};

exports.getPublicLists = () => {};

exports.getList = () => {};

exports.deleteList = () => {};
