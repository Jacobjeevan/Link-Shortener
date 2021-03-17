const User = require("../models/user");
const dayjs = require("dayjs");

async function getUserByEmail(email) {
  try {
    return User.findOne({ email }).exec();
  } catch (error) {
    throw new Error(`Failed to get DB user: ${error}`);
  }
}

async function createNewUser(params) {
  try {
    const newUser = new User(params);
    return newUser.save();
  } catch (error) {
    throw new Error(`Failed to create new User: ${error}`);
  }
}

async function getUserById(userId) {
  try {
    return User.findById(userId).exec();
  } catch (error) {
    throw new Error(`Failed to get DB user: ${error}`);
  }
}

async function updateResetParams(id, params) {
  try {
    const { token, tokenExpiration } = params;
    return User.updateOne(
      { _id: id },
      { $set: { token, tokenExpiration } }
    ).exec();
  } catch (error) {
    throw new Error(`Failed to update User: ${error}`);
  }
}

async function checkIfTokenExists(token) {
  try {
    return User.findOne({ token }).exec();
  } catch (error) {
    throw new Error(`Token not Found: ${error}`);
  }
}

function checkIfTokenExpired(expirationTime) {
  const valid = dayjs().isBefore(expirationTime);
  if (valid) return true;
  else {
    throw new Error(`Token Expired. Try Again`);
  }
}

async function checkIfValidToken(token) {
  try {
    const user = await checkIfTokenExists(token);
    return checkIfTokenExpired(user.tokenExpiration);
  } catch (error) {
    throw new Error(`Token Not Valid: ${error}`);
  }
}

async function updatePassword(token, password) {
  try {
    return User.findOneAndUpdate(
      { token },
      {
        $set: { password },
      }
    ).exec();
  } catch (error) {
    throw new Error(`Could not update Password: ${error}`);
  }
}

module.exports = {
  getUserByEmail,
  createNewUser,
  getUserById,
  updateResetParams,
  checkIfValidToken,
  updatePassword,
};
