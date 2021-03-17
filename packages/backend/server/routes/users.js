const router = require("express").Router();
const bcrypt = require("bcrypt");
const {
  getUserByEmail,
  createNewUser,
  updateResetParams,
  checkIfValidToken,
  updatePassword,
} = require("../db/repo/userRepo");
const { handleError } = require("../helpers/errors");
const {
  signupValidation,
  loginValidation,
  validate,
  requestPasswordResetValidation,
  getResetTokenValidation,
  postResetTokenValidation,
} = require("./validations/user.validations");
const {
  hashPassword,
  checkIfLoggedIn,
  getUser,
  sendResetPasswordEmail,
  checkIfUserExists,
} = require("../helpers/user.helper");
const logger = require("../helpers/logger");
const Str = require("@supercharge/strings");
const dayjs = require("dayjs");

router.post(
  "/password/reset",
  requestPasswordResetValidation(),
  validate,
  checkIfUserExists,
  async (req, res) => {
    const { email, user } = req.body;
    try {
      const token = Str.random(10);
      const tokenExpiration = dayjs().add(2, "hour");
      await updateResetParams(user._id, { token, tokenExpiration });
      const response = await sendResetPasswordEmail(email, token);
      const { success } = response;
      if (success) {
        res.status(200).json({ ...response, token });
      } else handleError(res, 400, "Could not send reset email");
    } catch (error) {
      handleError(res, 400, `Could not request password reset - ${error}`);
    }
  }
);

router.get(
  "/password/reset/:token",
  getResetTokenValidation(),
  validate,
  async (req, res) => {
    const { token } = req.params;
    try {
      await checkIfValidToken(token);
      res.status(200).json({ success: true });
    } catch (error) {
      logger.info(error);
      handleError(res, 400, error);
    }
  }
);

router.post(
  "/password/reset/:token",
  postResetTokenValidation(),
  validate,
  async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      await checkIfValidToken(token);
      const hashedPass = await hashPassword(password);
      await updatePassword(token, hashedPass);
      await updateResetParams(user._id, { token: "", tokenExpiration: "" });
      res.status(200).json({ success: true });
    } catch (error) {
      handleError(res, 400, error);
    }
  }
);

router.post("/register", signupValidation(), validate, async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await getUserByEmail(email.toLowerCase());
    if (user) {
      handleError(res, 403, "Email is taken - User already exists");
    } else {
      const hashedPass = await hashPassword(password);
      user = await createNewUser({
        email: email.toLowerCase(),
        password: hashedPass,
      });
      logger.info("User created");
      req.session.user = user;
      res.locals.user = user;
      return res.status(200).json({ success: true, user: getUser(user) });
    }
  } catch (error) {
    handleError(res, 400, error);
  }
});

router.post("/login", loginValidation(), validate, async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await getUserByEmail(email.toLowerCase());

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.locals.user = user;
        user = getUser(user);
        logger.info("User logged in", {
          type: "user_login",
          email: user.email,
        });
        return res.status(200).json({ success: true, user });
      }
    }
    handleError(res, 403, "Username/password incorrect");
  } catch (error) {
    handleError(res, 400, error);
  }
});

router.get("/logout", checkIfLoggedIn, (req, res) => {
  const { user } = req.session;
  req.session.destroy(() => {
    logger.info("User logout", {
      type: "user_logout",
      email: user.email,
    });
    res.clearCookie(process.env.Redis_session_name);
    res.status(200).json({ success: true });
  });
});

router.get("/user", ({ session }, res) => {
  const { user } = session;
  if (user) {
    logger.info("User fetch", {
      type: "user_fetch",
      email: user.email,
    });
    return res.status(200).json({ success: true, user: getUser(user) });
  }
  return res.status(200).json({ success: false });
});

module.exports = router;
