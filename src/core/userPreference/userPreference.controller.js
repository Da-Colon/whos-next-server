import * as userPreferenceServices from "./userPreference.services";

export const updateSelectedList = async (req, res) => {
  const user = req.user;
  const database = req.db;
  const params = req.params;
  const result = await userPreferenceServices.updatePreferences(
    database,
    user,
    { selectedList: params.listId }
  );
  return await res.status(200).json(result);
};

export const updateLikedLists = async (req, res) => {
  const user = req.user;
  const database = req.db;
  const { listId } = req.params;
  const userPreferences = await userPreferenceServices.getPreferences(
    database,
    user
  );
  const likedLists = [...userPreferences.likedLists, ...[listId]];
  const result = await userPreferenceServices.updatePreferences(
    database,
    user,
    { likedLists: likedLists }
  );
  return await res.status(200).send(result);
};

export const getPreferences = async (req, res) => {
  const user = req.user;
  const database = req.db;
  const result = await userPreferenceServices.getPreferences(database, user);
  if (!result.id) {
    return res
      .status(200)
      .json({ message: "unable to retrieve user preferences" });
  }
  return res.status(200).json(result);
};
