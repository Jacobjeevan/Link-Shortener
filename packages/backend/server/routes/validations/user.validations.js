const { body, validationResult, param } = require("express-validator");
const { handleError } = require("../../helpers/errors");

const signupValidation = () => {
  return [
    body("email", "Email is required")
      .notEmpty()
      .isString()
      .isEmail()
      .withMessage("Please provide a proper email")
      .trim(),
    body("password", "Password is required")
      .notEmpty()
      .isString()
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long")
      .matches(/^(?=.*\d.*)(?=.*[a-z].*)(?=.*[A-Z].*).{8,}$/)
      .withMessage(
        "Password must contain a number, one lower and one uppercase letter"
      ),
    body("passwordConfirm", "Password confirmation is required")
      .notEmpty()
      .isString()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email", "Email is required")
      .notEmpty()
      .isString()
      .withMessage("Please provide a proper email")
      .trim(),
    body("password").notEmpty().isString(),
  ];
};

const requestPasswordResetValidation = () => {
  return [body("email", "Email is required")];
};

const getResetTokenValidation = () => {
  return [param("token", "Token is required").notEmpty()];
};

const postResetTokenValidation = () => {
  return [
    param("token", "Token is required").notEmpty(),
    body("password", "Password is required").notEmpty(),
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
  signupValidation,
  loginValidation,
  requestPasswordResetValidation,
  getResetTokenValidation,
  postResetTokenValidation,
  validate,
};
