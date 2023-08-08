const messages = require("../constants/messages");

exports.IsAdmin = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res
      .status(401)
      .send({ success: false, message: messages.UNAUTHORIZED });
  }
};
exports.user = async (req, res, next) => {
  if (req.user.role === "user") {
    next();
  } else {
    return res
      .status(401)
      .send({ success: false, message: messages.UNAUTHORIZED });
  }
};
