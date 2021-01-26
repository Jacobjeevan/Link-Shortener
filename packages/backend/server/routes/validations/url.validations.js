const { body, validationResult } = require("express-validator");
const { handleError } = require("../../helpers/errors");

const postShortenValidation = () => {
  return [
    body("url", "Please a provide a url to shorten")
      .notEmpty()
      .isString()
      .trim(),
  ];
};

const deleteShortUrlValidation = () => {
  return [
    body("urlId", "Please provide a url Id to delete")
      .notEmpty()
      .isString()
      .trim(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(res, 400, errors.array({ onlyFirstError: true })[0]);
  }
  next();
};

module.exports = {
  postShortenValidation,
  validate,
  deleteShortUrlValidation,
};
