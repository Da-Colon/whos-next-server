import handleError, { ERROR_TYPES } from "../errors";
import List, { createList, listsByUser } from "../models/list";

exports.createList = async (db, listId, properties) => {
  try {
    const template = List(db);
    const listResponse = await createList(template, listId, properties);
    return listResponse;
  } catch {
    return handleError(
      ERROR_TYPES.UNKNOWN,
      "services",
      "There was an service error"
    );
  }
};

exports.listsByUser = async (db, listsDetails) => {
  try {
    const lists = Promise.all(
      listsDetails.map(async (list) => {
        const { id, list_name } = list
        const template = List(db);
        const listOfNames = await listsByUser(template, id);
        return {listId: id, listName: list_name, list: listOfNames};
      })
    );
    return lists
  } catch {
    return handleError(
      ERROR_TYPES.UNKNOWN,
      "services",
      "There was an service error"
    );
  }
};
