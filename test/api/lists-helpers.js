import { create } from "../../src/core/lists/lists.services";
import Lists from "../../src/models/lists";
import { testDb } from "../global.spec";

// creates list
export const createTestList = async (user, givenProps) => {
  const properties = {
    name: "Test List",
    list: ["Goku", "Gohan"],
  };
  const listsTemplate = Lists(testDb());

  const list = await create(listsTemplate, user, givenProps || properties);
  return list.id;
};

// retrieves list

export const findList = async (listId) => {
  const listsTemplate = Lists(testDb());
  const list = await listsTemplate.findOne({ _id: listId });
  return list;
};
