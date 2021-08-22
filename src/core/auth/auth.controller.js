import Cookies from "cookies";
import { login as userLogin, auth as userAuth } from "./auth.services";

const login = async (req, res) => {
  try {
    const response = await userLogin(req.db, req.body);

    if (response.error) {
      return res
        .status(response.error.httpCode || 500)
        .json({ error: response.error.message });
    }

    const cookies = new Cookies(req, res);
    cookies.set("token", response.token, { expries: response.expirationDate });

    return res
      .status(200)
      .json({ user: response.user, token: response.token, message: "ok!" });
  } catch (e) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

const auth = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const response = await userAuth(req.db, token);

    if (response.error) {
      return res.status(response.error.httpCode || 500);
    }
    req.user = response;
    return res.status(200).json({ user: response });
  } catch (e) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

export { login, auth };
