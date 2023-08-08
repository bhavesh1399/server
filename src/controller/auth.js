const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { successResponse, errorResponse } = require("../helper/response");
const validator = require("../middlewares/validatator");
const { generateToken } = require("../helper/generateToken");
const messages = require("../constants/messages");

const userRegister = async (req, res) => {
  try {
    await validator(req, res);
    const user = req.body;

    const emailNotRegistered = await validateEmail(user.email);
    if (!emailNotRegistered) {
      return res.status(200).json({
        success: false,
        message: messages.auth.EMAIL_ALREADY_REGISTRED,
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);
    await User.create({
      ...user,
      password: hashedPassword,
    });

    return successResponse(res, messages.auth.RIGISTRATION_SUCCESS);
  } catch (err) {
    console.log(err);
    return errorResponse(res, 500, messages.INTERNAL_SERVER_ERROR);
  }
};

const validateEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? false : true;
};

const userLogin = async (req, res) => {
  try {
    await validator(req, res);
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return errorResponse(res, 200, messages.auth.INVALID_CREDENTIALS);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 200, messages.auth.INVALID_CREDENTIALS);
    }

    if (user.role !== role) {
      return errorResponse(res, 200, messages.auth.INVALID_ROLE);
    }

    const token = generateToken(user);
    const data = {
      userDetail: user,
      token,
    };

    return successResponse(res, messages.auth.LOGIN_SUCCESS, data);
  } catch (err) {
    console.log(err);
    return errorResponse(res, 500, messages.INTERNAL_SERVER_ERROR);
  }
};

const getUsersList = async (req, res) => {
  try {
    const userList = await User.find({ role: "user" })
      .select("-password")
      .sort([["updatedAt", -1]])
      .exec();

    if (!userList) {
      return errorResponse(res, 200, messages.auth.CAN_NOT_GET_USER_LIST);
    }
    const users = {
      userDetail: userList,
    };
    return successResponse(res, messages.auth.GET_USER_LIST_SUCCESS, users);
  } catch {
    return errorResponse(res, 500, messages.INTERNAL_SERVER_ERROR);
  }
};

const deleteUser = async (req, res) => {
  try {
    let { userId } = req.body;
    if (!userId) {
      return errorResponse(res, 200, messages.auth.USER_NOT_FOUND);
    }
    await User.findOneAndDelete(userId);
    return successResponse(res, messages.auth.DELETE_USER_SUCCESS);
  } catch (err) {
    console.log(err);
    return errorResponse(res, 500, messages.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  userRegister,
  userLogin,
  getUsersList,
  deleteUser,
};
