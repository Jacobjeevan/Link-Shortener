const bcrypt = require("bcrypt");
const { getUserById, getUserByEmail } = require("../db/repo/userRepo");
const { handleError } = require("./errors");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const fs = require("fs");
const path = require("path");
const logger = require("./logger");

const template = fs.readFileSync(
  path.resolve(__dirname, "../../assets/emailTemplate.html"),
  {
    encoding: "utf-8",
  }
);

var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SendinBlue_API;

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
    logger.error(error);
    return handleError(res, 404, "User not found");
  }
};

const checkIfUserExists = async (req, res, next) => {
  const { email } = req.body;
  try {
    const foundUser = await getUserByEmail(email);
    if (!foundUser) throw new Error("User not found");
    else {
      req.body.user = foundUser;
      next();
    }
  } catch (error) {
    logger.error(error);
    return handleError(res, 404, error);
  }
};

const getUser = (user) => {
  return {
    email: user.email,
    id: user._id,
  };
};

const sendMail = async (to, subject, message) => {
  if (process.env.NODE_ENV !== "test") {
    try {
      const siteadmin = {
        name: "Jacob from JeevanLink",
        email: process.env.Email,
      };
      let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
      let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      sendSmtpEmail.sender = siteadmin;
      sendSmtpEmail.to = [{ email: to }];
      sendSmtpEmail.htmlContent = message;
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.replyTo = siteadmin;
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
      return { ...response, success: true };
    } catch (e) {
      logger.error(e);
    }
  }
  return { success: true };
};

const sendRegistrationEmail = async (to) => {
  await sendMail(to, "", "");
};

const sendResetPasswordEmail = async (to, hash) => {
  const body = template
    .replace("%titlePlaceHolder%", "Password reset request")
    .replace(
      "%bodyPlaceHolder%",
      `We received a request to reset your password. You can do so by clicking the link below. Please ignore this message if you didn't request the reset.`
    )
    .replace("%buttonPlaceHolder%", "Reset Password")
    .replace(
      "%linkplaceholder%",
      `${process.env.BACKEND_URL}/password/reset/${hash}`
    );

  return sendMail(to, "Jeevan Link - Password Reset", body);
};

module.exports = {
  hashPassword,
  checkIfLoggedIn,
  getUser,
  sendResetPasswordEmail,
  checkIfUserExists,
};
