const bcrypt = require("bcrypt");
const { handleError } = require("./errors");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

const checkIfLoggedIn = (req, res, next) => {
  const { user } = req.session;
  if (user) {
    next();
  } else {
    handleError(res, 400, "Please login first");
  }
};

module.exports = { hashPassword, checkIfLoggedIn };
