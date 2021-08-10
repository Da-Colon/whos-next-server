import { root } from "../core/root/root.router";
import { auth } from "../core/auth/auth.router";
import { users } from "../core/users/users.router";
import { lists } from "../core/lists/lists.router";
import { authenticate } from "../middleware";

export const router = (app) => {
  app.use("/", root(app));
  app.use("/auth", auth);
  app.use("/users", users);
  app.use("/lists", authenticate, lists);
};
