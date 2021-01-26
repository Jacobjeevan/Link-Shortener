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
const logger = require("../helpers/logger");

router.post(
  "/shorten",
  checkIfLoggedIn,
  postShortenValidation(),
  validate,
  async (req, res) => {
    const { url, customURL } = req.body;
    const { user } = req.session;
    try {
      if (customURL) {
        const custom = await createCustomShortUrl(url, customURL, user._id);
        if (!custom) return handleError(res, 400, "Custom Link already exists");
        shortUrl = customURL;
        logger.info("Created custom short url", {
          type: "shorten_url_custom",
          shortUrl,
        });
      } else {
        shortUrl = await createShortUrl(url, user._id);
        logger.info("Created short url", {
          type: "shorten_url",
          shortUrl,
        });
      }
      res.json({ success: true, shortUrl });
    } catch (error) {
      handleError(res, 400, error);
    }
  }
);

// fn: get all shortened urls in DB
router.get("/all/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const links = await getAllUrls(userId);
    if (links) res.status(200).json({ success: true, links });
    else handleError(res, 404, "Links not found");
  } catch (error) {
    handleError(res, 400, error);
  }
});

router.post(
  "/delete/",
  checkIfLoggedIn,
  deleteShortUrlValidation(),
  validate,
  async (req, res) => {
    const { urlId } = req.body;
    try {
      await urlsRepo.deleteShortUrl(urlId);
      res.status(200).json({ success: true });
    } catch (error) {
      handleError(res, 400, error);
    }
  }
);

router.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await getUrl(shortUrl);
    if (url) {
      logger.info("Fetching long url", {
        type: "fetch_long_url",
        shortUrl,
        url,
      });
      res.status(200).json({ success: true, url });
    } else handleError(res, 404, "Url not Found");
  } catch (error) {
    handleError(res, 400, error);
  }
});

module.exports = router;
