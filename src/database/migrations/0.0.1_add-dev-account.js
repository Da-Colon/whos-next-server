import { User } from '../../models/users';
module.exports = function (cb) {
  const model = User(this.db)
  model.create({
    first_name: process.env.DEV_FIRST_NAME,
    last_name: process.env.DEV_LAST_NAME,
    email_address: process.env.DEV_EMAIL,
    password: process.env.DEV_PASSWORD,
  }).then(() => cb()).catch(this.debug);
}
