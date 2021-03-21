import { User } from '../../models/user';
module.exports = function (cb) {
  const model = User(this.db)
  model.create({
    first_name: process.env.DEV_FIRST_NAME,
    last_name: process.env.DEV_LAST_NAME,
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
  }).then(() => cb()).catch(this.debug);
}
