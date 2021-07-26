import List, { createList, listByListId as findList } from "../../models/list";

exports.createList = async (db, listId, properties) => {
    const template = List(db);
    const listResponse = await createList(template, listId, properties);
    if(listResponse.ok) {
      return 'success'
    } else return 'failed'
};

export const listByListId = async (db, listDetails) => {
    const template = List(db);
    const lists = await findList(template, listDetails.id);
    return lists
};
