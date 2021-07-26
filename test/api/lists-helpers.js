import List, {createList, listByListId} from "../../src/models/list";
import Lists, { addToLists } from "../../src/models/lists";
import { testDb } from "../global.spec";

// creates list
export const createTestList = async (user) => {
  const properties = {
    listName: 'Test List',
    list: ["Goku", "Gohan"],
  }
  const listsTemplate = Lists(testDb());
  const listTemplate = List(testDb());

  const list = await addToLists(listsTemplate, user, properties);
  const listPromise = Promise.all(properties.list.map(async listItem => {
    return await createList(listTemplate, list.id, listItem);
  }))
  if((!listPromise).includes('failed')) {
    return list.id
  }
}

// retrieves list

export const findList = async (listId) => {
  const listsTemplate = Lists(testDb());
  const list = await listByListId(listsTemplate, listId)
  return list
}