import { root } from "../core/root/root.router";
import express from 'express'
import { auth } from "../core/auth/auth.router";
import { users } from "../core/users/users.router";
import { lists } from "../core/lists/lists.router";
import { userPreferences } from "../core/userPreferences/userPreferences.router";
import { authenticate } from "../middleware";

export const router = (app: express.Application) => {
  app.use("/", root(app));
  app.use("/auth", auth);
  app.use("/users", users);
  app.use("/lists", authenticate, lists);
  app.use("/userPreferences", authenticate, userPreferences);
};
