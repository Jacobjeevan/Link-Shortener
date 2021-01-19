const bcrypt = require("bcrypt");
const { getUserById } = require("../db/repo/userRepo");
const { handleError } = require("./errors");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

const checkIfLoggedIn = async (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return handleError(res, 400, "Please login first");
  }
  try {
    const foundUser = await getUserById(user._id);
    if (foundUser) {
      next();
    } else {
      return handleError(res, 404, "UserId not found");
    }
  } catch (error) {
    console.log(error);
    return handleError(res, 404, "User not found");
  }
};

const getUser = (user) => {
  return {
    email: user.email,
    id: user._id,
  };
};

module.exports = { hashPassword, checkIfLoggedIn, getUser };
