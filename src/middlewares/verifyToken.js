const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/index");
const User = require("../models/User");
const messages = require("../constants/messages");

const verifyToken = (req, res, next) => {
  let bearerToken;
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
  }
  if (!bearerToken) {
    return res
      .status(401)
      .send({ success: false, message: messages.TOKEN_NOT_VALID });
  }
  try {
    if (bearerToken) {
      const data = jwt.verify(bearerToken, SECRET);
      User.findOne({ _id: data.userId }).then((user) => {
        req.user = data;
        next();
      });
    }
  } catch {
    return res
      .status(401)
      .send({ success: false, message: messages.TOKEN_NOT_VALID });
  }
};

const getRequestedUserToken = (req, res, next) => {
  let bearerToken;
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
  }
  try {
    let data = {};
    if (bearerToken) {
      data = jwt.verify(bearerToken, SECRET);
    }
    req.user = data;
    next();
  } catch {
    return res
      .status(401)
      .send({ success: false, message: messages.TOKEN_NOT_VALID });
  }
};

module.exports = {
  verifyToken,
  getRequestedUserToken,
};
