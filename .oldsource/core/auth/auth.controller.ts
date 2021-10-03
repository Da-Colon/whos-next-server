import Cookies from "cookies";
import { Request } from "../../types/express.interface";
import express from "express";
import { login as userLogin, auth as userAuth } from "./auth.services";

const login = async (req: Request, res: express.Response) => {
  try {
    const response = await userLogin(req.db, req.body);

    if (response.error) {
      return res.status(response.error.httpCode || 500).json({ error: response.error.message });
    }

    const cookies = new Cookies(req, res);
    cookies.set("token", response.token, { expires: response.expirationDate });

    return res.status(200).json({ user: response.user, token: response.token, message: "ok!" });
  } catch (e: any) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

const auth = async (req: Request, res: express.Response) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.sendStatus(400).send("bad request");
    }
    const response = await userAuth(req.db, token);

    if (response.error) {
      return res.status(response.error.httpCode || 500);
    }
    req.user = response;
    return res.status(200).json({ user: response });
  } catch (e: any) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

export { login, auth };
