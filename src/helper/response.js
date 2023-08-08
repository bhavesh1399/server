const successResponse = (res, message = '', data = null) => {
  return res.status(200).json({
    success: true,
    message: message,
    data: data ? data : undefined,
  });
};

const errorResponse = (res, statusCode, message = '') => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
