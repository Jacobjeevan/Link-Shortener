const logger = require("./logger");

const handleError = (res, code, errorMsg) => {
  let statusCode = 400;
  let error;

  if (typeof errorMsg === "object") {
    statusCode = errorMsg.statusCode;
    const { param, msg } = errorMsg;
    if (param && msg) {
      error = `${msg} - ${param}`;
    } else {
      error = errorMsg;
    }
  } else if (typeof errorMsg === "string") {
    error = errorMsg;
  }

  statusCode = code || statusCode;

  logger.error(error);

  res.status(statusCode).json({
    success: false,
    statusCode,
    error,
  });
};

module.exports = { handleError };
