const router = require("express").Router();
const {
  getUrl,
  createShortUrl,
  createCustomShortUrl,
} = require("../db/repo/urlsRepo");
const { handleError } = require("../helpers/errors");
const { checkIfLoggedIn } = require("../helpers/user.helper");
const {
  postShortenValidation,
  validate,
} = require("./validations/url.validations");
const path = require("path");

router.post(
  "/shorten",
  checkIfLoggedIn,
  postShortenValidation(),
  validate,
  async (req, res) => {
    const { url, customURL } = req.body;
    let { shortUrl } = req.body;
    try {
      if (customURL && shortUrl) {
        const custom = await createCustomShortUrl(url, shortUrl);
        if (!custom) return handleError(res, 400, "Custom Link already exists");
      } else {
        shortUrl = await createShortUrl(url);
      }
      res.json({ shortUrl: shortUrl });
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
