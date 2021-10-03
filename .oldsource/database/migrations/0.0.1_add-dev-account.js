import userPreferences from "../../models/userPreferences";
import { User } from "../../models/users";
module.exports = function (cb) {
  const model = User(this.db);
  const prefModel = userPreferences(this.db);
  model
    .create({
      email: process.env.DEV_EMAIL,
      password: process.env.DEV_PASSWORD,
    })
    .then((user) => prefModel.create({ userId: user.id }))
    .then(() => cb())
    .catch(this.debug);
};
