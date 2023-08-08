const express = require("express");
const {
  signupValidation,
  loginValidation,
} = require("../helper/validateRequest");
const Controller = require("../controller/auth");

const router = express.Router();

router.post("/register", signupValidation, Controller.userRegister);

router.post("/login", loginValidation, Controller.userLogin);

router.get("/get-users-list", Controller.getUsersList);

router.delete("/delete-user", Controller.deleteUser);

module.exports = router;
