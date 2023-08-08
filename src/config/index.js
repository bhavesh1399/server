require("dotenv").config();

module.exports = {
  DB: process.env.MONGO_URL,
  PORT: process.env.APP_PORT,
  SECRET: process.env.APP_SECRET,
};
