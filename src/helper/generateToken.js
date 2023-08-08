require("dotenv").config();
const { SECRET } = require("../config/index");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
      email: user.email,
      userName: user.name,
    },
    SECRET
  );
};

module.exports = { generateToken };
