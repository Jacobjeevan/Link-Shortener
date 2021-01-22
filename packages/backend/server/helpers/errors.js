const logger = require("./logger");

const handleError = (res, code, errorMsg) => {
  let statusCode = 400;
  let error;

  if (typeof errorMsg === "object") {
    statusCode = errorMsg.statusCode;
    const { param, msg } = errorMsg;
    error = `${msg} - ${param}`;
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
