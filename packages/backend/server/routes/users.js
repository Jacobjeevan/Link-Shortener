const router = require("express").Router();
const bcrypt = require("bcrypt");
const { getUserByEmail, createNewUser } = require("../db/repo/userRepo");
const { handleError } = require("../helpers/errors");
const {
  signupValidation,
  loginValidation,
  validate,
} = require("./validations/user.validations");
const {
  hashPassword,
  checkIfLoggedIn,
  getUser,
} = require("../helpers/user.helper");
const logger = require("../helpers/logger");

router.post("/password/reset", async (req, res) => {});

router.post("/password/reset/:token", async (req, res) => {});

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
