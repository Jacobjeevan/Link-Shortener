const handleError = (res, code, errorMsg) => {
  let statusCode = 400;
  let error;

  if (typeof errorMsg === "object") {
    statusCode = errorMsg.statusCode;
    error = errorMsg;
  } else if (typeof errorMsg === "string") {
    error = { msg: errorMsg };
  }

  statusCode = code || statusCode;

  console.log(error);

  res.status(statusCode).json({
    statusCode,
    error,
  });
};

module.exports = { handleError };
