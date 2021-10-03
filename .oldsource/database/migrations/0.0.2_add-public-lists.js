import { Lists } from "../../models/lists";
import User from "../../models/users";

module.exports = async function (cb) {
  const userModal = User(this.db);
  const user = await userModal.findOne({ email: process.env.DEV_EMAIL });
  const lists = [
    {
      name: "Presidents",
      isPrivate: false,
      userId: user.id,
      list: [
        { name: "George Washington" },
        { name: "John Adams" },
        { name: "Thomas Jefferson" },
        { name: "James Madison" },
        { name: "James Monroe" },
        { name: "John Quincy Adams" },
        { name: "Andrew Jackson" },
        { name: "Martin Van Buren" },
        { name: "William Henry Harrison" },
        { name: "John Tyler" },
        { name: "James K. Polk" },
        { name: "Zachary Taylor" },
        { name: "Millard Fillmore" },
        { name: "Franklin Pierce" },
        { name: "James Buchanan" },
        { name: "Abraham Lincoln" },
        { name: "Andrew Johnson" },
        { name: "Ulysses S. Grant" },
        { name: "Rutherford B. Hayes" },
        { name: "James Garfield" },
        { name: " Chester Arthur" },
        { name: "Grover Cleveland" },
        { name: "Benjamin Harrison" },
        { name: "William McKinley" },
        { name: "Theodore Roosevelt" },
        { name: "William Howard Taft" },
        { name: "Woodrow Wilson" },
        { name: "Warren Harding" },
        { name: "Calvin Coolidge" },
        { name: "Herbert Hoover" },
        { name: "Franklin D. Roosevelt" },
        { name: "Harry Truman" },
        { name: "Dwight Eisenhower" },
        { name: "John F. Kennedy" },
        { name: "Lyndon Johnson" },
        { name: "Richard Nixon" },
        { name: "Gerald Ford" },
        { name: "Jimmy Carter" },
        { name: "Ronald Reagan" },
        { name: "George Bush" },
        { name: "Bill Clinton" },
        { name: "George W. Bush" },
        { name: "Barack Obama" },
        { name: "Donald Trump" },
        { name: "Joe Biden" },
      ],
    },
    {
      name: "Z Fighters",
      isPrivate: false,
      userId: user.id,
      list: [
        { name: "Goku" },
        { name: "Vegeta" },
        { name: "Gohan" },
        { name: "Future Trunks" },
        { name: "Android 17" },
        { name: "Majin Buu" },
        { name: "Piccolo" },
        { name: "Android 18" },
        { name: "Trunks" },
        { name: "Goten" },
        { name: "Krillin" },
        { name: "Tien Shinhan" },
        { name: "Yamcha" },
        { name: "Master Roshi" },
        { name: "Chiaotzu" },
        { name: "Yajirobe" },
      ],
    },
  ];
  const model = Lists(this.db);
  Promise.all(
    lists.map(async (list) => {
      await model.create(list);
    })
  )
    .then(() => cb())
    .catch(this.debug);
};
