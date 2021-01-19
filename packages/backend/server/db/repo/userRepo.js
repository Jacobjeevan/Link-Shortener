const User = require("../models/user");

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

module.exports = {
  getUserByEmail,
  createNewUser,
  getUserById,
};
