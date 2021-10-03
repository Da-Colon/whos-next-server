import * as ListsServices from "./lists.services";
import express from "express";
import { Request } from "../../types/express.interface";

// todo need to update and remove any unnecessary code
export const createLists = async (req: Request, res: express.Response) => {
  const result: any = await ListsServices.create(req.db, req.user, req.body);

  if (result.error) {
    return res.status(result.error.httpCode || 500).json({ message: result.error.message });
  }
  return res.status(200).json({ message: "success" });
};

export const findListsByUser = async (req: Request, res: express.Response) => {
  try {
    const result: any = await ListsServices.findListsByUser(req.db, req.user);
    if (!result.length) {
      return res.status(200).json({ message: "No Lists created" });
    }
    return res.status(200).json(result);
  } catch (e: any) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

export const getList = async (req: Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const result = await ListsServices.getList(req.db, id);
    if (!result) {
      return res.status(400).json({ message: "list not found" });
    }
    return res.status(200).json(result);
  } catch (e: any) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

export const getPublicLists = async (req: Request, res: express.Response) => {
  try {
    const result: any = await ListsServices.getPublicLists(req.db);

    if (!result.length) {
      return res.status(200).json({ message: "no public lists available" });
    }
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "There was an error in lists.controller - GET - /public" });
  }
};

export const updateListsProperties = async (req: Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const result: any = await ListsServices.updatelistsProperties(req.db, id, req.body);
    if (!result.ok) {
      return res.status(400).json({ message: "update unsuccessful" });
    }
    return res.status(200).json({ message: "update succesful" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "There was an error in lists.controller - PUT - /:id" });
  }
};

export const deleteList = async (req: Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const result: any = await ListsServices.deleteList(req.db, id);
    if (result.deletedCount !== 1) return res.status(200).json({ error: "could not delete list" });
    return res.status(200).json({ message: "success" });
  } catch (e: any) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};
