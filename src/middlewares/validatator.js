const { validationResult } = require('express-validator');
const { errorResponse } = require('../helper/response');
const validator = async (req, res) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 200, errors.errors[0].msg);
    }
  } catch (err) {
    return errorResponse(res, 200, err.message);
  }
};
module.exports = validator;
