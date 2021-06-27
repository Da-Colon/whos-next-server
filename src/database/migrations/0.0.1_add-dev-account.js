import { User } from '../../models/users';
module.exports = function (cb) {
  const model = User(this.db)
  model.create({
    email: process.env.DEV_EMAIL,
    password: process.env.DEV_PASSWORD,
  }).then(() => cb()).catch(this.debug);
}
