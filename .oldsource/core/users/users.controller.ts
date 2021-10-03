import {
  create as createUser,
  getOne as getUser,
  getAll as getUsers,
  update as updateUser,
} from "./users.services";
import * as authServices from "../auth/auth.services";
import { Request } from "../../types/express.interface";
import express from "express";
const create = async (req: Request, res: express.Response) => {
  try {
    const response: any = await createUser(req.db, req.body);

    if (response.error) {
      return res.status(response.error.httpCode || 500).json({ message: response.error.message });
    }
    const userAndToken = await authServices.login(req.db, req.body);

    return res.status(200).json(userAndToken);
  } catch (e: any) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

const getAll = async (req: Request, res: express.Response) => {
  try {
    const response = await getUsers(req.db);

    if (response.error)
      return res.status(response.error.httpCode || 500).json({ message: response.error.message });
    return res.status(200).json(response);
  } catch (e: any) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

const getOne = async (req: Request, res: express.Response) => {
  try {
    const {
      query: { id },
    } = req;
    if(!id) {
      return res.sendStatus(400).send('bad request');
    }
    const response = await getUser(req.db, id as string);
    if (response.error)
      return res.status(response.error.httpCode || 500).json({ message: response.error.message });
    return res.status(200).json({ user: response });
  } catch (e: any) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

const update = async (req: Request, res: express.Response) => {
  try {
    const {
      query: { id },
    } = req;
    const response: any = await updateUser(req.db, id as string, req.body);

    if (response.error)
      return res.status(response.error.httpCode || 500).json({ message: response.error.message });
    return res.status(200).json(response);
  } catch (e: any) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

export default { create, getOne, getAll, update };
