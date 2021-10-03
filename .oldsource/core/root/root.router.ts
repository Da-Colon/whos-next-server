import express, { Router } from "express";
import { getRoot } from "./root.controller";

export const root = (app: express.Application) => {
  const router = Router();

  router.get("/", getRoot(app) as express.Application);

  return router;
};
