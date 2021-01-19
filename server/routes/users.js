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
    const user = await getUserByEmail(email.toLowerCase());

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.locals.user = user;
        return res.status(200).json({ success: true, user: getUser(user) });
      }
    }
    handleError(res, 403, "Username/password incorrect");
  } catch (error) {
    handleError(res, 400, error);
  }
});

router.get("/logout", checkIfLoggedIn, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie(process.env.Redis_session_name);
    res.status(200).json({ success: true });
  });
});

module.exports = router;
