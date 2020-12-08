const router = require("express").Router();
const { getUrl, createShortUrl } = require("../db/repo/urlsRepo");
const { handleError } = require("../helpers/errors");
const { checkIfLoggedIn } = require("../helpers/user.helper");
const {
  postShortenValidation,
  validate,
} = require("./validations/url.validations");
const path = require("path");

router.get("/home", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../../frontend/index.html`));
});

router.post(
  "/shorten",
  checkIfLoggedIn,
  postShortenValidation(),
  validate,
  async (req, res) => {
    const { url } = req.body;
    try {
      if (url) {
        const shortUrl = await createShortUrl(url);
        res.json({ shortUrl: shortUrl });
      }
    } catch (error) {
      handleError(res, 400, error);
    }
  }
);

router.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await getUrl(shortUrl);
    if (url) res.redirect(url);
    else handleError(res, 404, "Url not Found");
  } catch (error) {
    handleError(res, 400, error);
  }
});

// fn: get all shortened urls in DB
router.get("/all", async (req, res) => {});

module.exports = router;
