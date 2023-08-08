const mongoose = require("mongoose");
const User = require("../models/User");
const { DB } = require("../config/index");
const bcrypt = require("bcryptjs");

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected MongoDB Successfully !!`);
  })
  .catch((err) => {
    console.log(`Unable to connect with the Database ${err}`);
  });

const seedDB = async () => {
  const salt = await bcrypt.genSalt(10);
  const seedAdmin = [
    {
      name: "Admin",
      email: "admin@prosesweb.com",
      role: "admin",
      password: await bcrypt.hash("Admin@123", salt),
    },
  ];
  await User.insertMany(seedAdmin);
  console.log("Admin is Created Successfully");
};

seedDB().then(() => {
  mongoose.connection.close();
});
