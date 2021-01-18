const router = require("express").Router();
const {
  getUrl,
  createShortUrl,
  createCustomShortUrl,
  getAllUrls,
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
      res.json({ success: true, shortUrl: shortUrl });
    } catch (error) {
      handleError(res, 400, error);
    }
  }
);

// fn: get all shortened urls in DB
router.get("/all/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const links = await getAllUrls();
    if (links) res.status(200).json({ success: true, links });
    else handleError(res, 404, "Links not found");
  } catch (error) {
    handleError(res, 400, error);
  }
});

router.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await getUrl(shortUrl);
    if (url) res.status(200).json({ success: true, url });
    else handleError(res, 404, "Url not Found");
  } catch (error) {
    handleError(res, 400, error);
  }
});

module.exports = router;
