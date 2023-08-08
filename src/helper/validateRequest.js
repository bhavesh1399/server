const { check } = require("express-validator");
const messages = require("../constants/messages");

exports.signupValidation = [
  check("name", messages.expressValidations.NAME_REQUIRED).notEmpty(),
  check("email", messages.expressValidations.VALID_EMAIL_REQUIRED).isEmail(),
  check(
    "password",
    messages.expressValidations.VALID_PASSWORD_REQUIRED
  ).isLength({
    min: 6,
  }),
];

exports.loginValidation = [
  check("email", messages.expressValidations.VALID_EMAIL_REQUIRED)
    .isEmail()
    .notEmpty(),
  check("password", messages.expressValidations.PASSWORD_REQUIRED).notEmpty(),
];

exports.emailValidation = [
  check("email", messages.expressValidations.EMAIL_REQUIRED)
    .isEmail()
    .notEmpty(),
];

exports.passwordValidation = [
  check("password", messages.expressValidations.VALID_PASSWORD_REQUIRED)
    .notEmpty()
    .isLength({ min: 6 }),
];
