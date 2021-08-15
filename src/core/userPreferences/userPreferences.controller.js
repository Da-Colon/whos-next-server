import * as UserPreferencesServices from "./userPreferences.services";

export const updateSelectedList = async (req, res) => {
  const user = req.user;
  const database = req.db;
  const params = req.params;
  const result = await UserPreferencesServices.updateUserPreferences(
    database,
    user,
    { selectedList: params.listId }
  );
  if (result.error) {
    return await res.status(500).json(result);
  }
  return await res.status(200).json(result);
};

export const updateLikedLists = async (req, res) => {
  try {
    const user = req.user;
    const database = req.db;
    const { listId } = req.params;
    const userPreferences = await UserPreferencesServices.getUserPreferences(
      database,
      user
    );
    const likedLists = [...userPreferences.likedLists, ...[listId]];
    const result = await UserPreferencesServices.updateUserPreferences(
      database,
      user,
      { likedLists: likedLists }
    );
    if (result.error) {
      return await res.status(500).json(result);
    }
    return await res.status(200).send(result);
  } catch (e) {
    console.error("there was an error in request", e);
  }
};

export const getPreferences = async (req, res) => {
  const user = req.user;
  const database = req.db;
  const result = await UserPreferencesServices.getUserPreferences(database, user);
  if (!result.id) {
    return res
      .status(200)
      .json({ message: "unable to retrieve user preferences" });
  }
  return res.status(200).json(result);
};

export const removedLikedList = async (req, res) => {
  try {
    const user = req.user;
    const database = req.db;
    const { listId } = req.params;
    const userPreferences = await UserPreferencesServices.getUserPreferences(
      database,
      user
    );
    const likedLists = userPreferences.likedLists.filter((list) => list.id !== listId);
    const result = await UserPreferencesServices.updateUserPreferences(
      database,
      user,
      { likedLists: likedLists }
    );
    if (result.error) {
      return await res.status(500).json(result);
    }
    return await res.status(200).send(result);
  } catch (e) {
    console.error("there was an error in request", e);
  }
};
