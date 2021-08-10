import * as ListsServices from "./lists.services";

export const createLists = async (req, res) => {
  const result = await ListsServices.create(req.db, req.user, req.body);

  if (result.error) {
    return res
      .status(result.error.httpCode || 500)
      .json({ message: result.error.message });
  }
  return res.status(200).json({ message: "success" });
};

export const findListsByUser = async (req, res) => {
  try {
    const result = await ListsServices.findListsByUser(req.db, req.user);
    return await res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

export const getList = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ListsServices.getList(req.db, id);
    if (!result) {
      return res.status(400).json({ error: "list not found" });
    }
    return await res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

export const getPublicLists = async (req, res) => {
  try {
    const result = await ListsServices.getPublicLists(req.db);

    if (!result.length) {
      return res.status(204)
        .json({ error: 'no public lists available'});
    }
    return await res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({error: 'There was an error in lists.controller - GET - /public'});
  }
};

export const updateListsProperties = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ListsServices.updatelistsProperties(
      req.db,
      id,
      req.body
    );
    if (!result.ok) {
      return res.status(400).json({ message: "update unsuccessful" });
    }
    return res.status(200).json({ message: "update succesful" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({error: 'There was an error in lists.controller - PUT - /:id'});
  }
};

export const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ListsServices.deleteList(req.db, id);
    if (result.deletedCount !== 1)
      return res.status(400).json({ error: "List not found" });
    return await res.status(200).json({ message: "success" });
  } catch (e) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};
