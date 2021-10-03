import doCors from "cors";
import { auth as authService } from "../core/auth/auth.services";
import morgan from "morgan";
import express from "express";

export const logging = (app: express.Application) => {
  const nodeEnv = process.env.NODE_ENV;

  const logLevel = nodeEnv === "development" ? "dev" : "combined";
  const options = { skip: () => nodeEnv === "test" };

  const logger = morgan(logLevel, options);
  app.use(logger);
};

export const encoding = (app: express.Application) => {
  app.use(express.json());
};

export const cors = (app: express.Application) => {
  app.use(doCors());
};

// todo figure out why express.Request doesn't work here.
export const authenticate = (req: any, _: express.Response, next: express.NextFunction) => {
  return authService(req.db, req.header("authorization"))
    .then((user) => (req.user = user))
    .then(() => next())
    .catch(() => console.log("Something when wrong"));
};
