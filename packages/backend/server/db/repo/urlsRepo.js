const Str = require("@supercharge/strings"),
  Url = require("../models/url");

async function getUrl(shortUrl) {
  try {
    const UrlEntry = await Url.findOne({ shortUrl: shortUrl.toLowerCase() });
    return UrlEntry ? UrlEntry.longUrl : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Get Url By Short Url Error: ${error}`);
  }
}

async function getShortUrl(longUrl, userId) {
  try {
    const UrlEntry = await Url.findOne({ longUrl, userId });
    return UrlEntry ? UrlEntry.shortUrl : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Get Short Url By Url Error: ${error}`);
  }
}

async function createShortUrl(url, userId) {
  try {
    let shortUrl = await getShortUrl(url, userId);
    if (!shortUrl) {
      shortUrl = await shortenUrl(url, userId);
    }
    return shortUrl;
  } catch (error) {
    console.log(error);
    throw new Error(`Create Shorten Url Error: ${error}`);
  }
}

async function createCustomShortUrl(longUrl, shortUrl, userId) {
  try {
    const existinglongUrl = await getUrl(shortUrl);
    if (existinglongUrl) {
      return false;
    }
    await Url.create({
      longUrl,
      shortUrl: shortUrl.toLowerCase(),
      userId,
    });
    return true;
  } catch (error) {
    throw new Error(`Could not Create Custom Link: ${error}`);
  }
}

async function shortenUrl(longUrl, userId) {
  try {
    const shortUrl = Str.random(5);
    await Url.create({
      longUrl,
      shortUrl: shortUrl.toLowerCase(),
      userId,
    });
    return shortUrl;
  } catch (error) {
    console.log(error);
    throw new Error(`Shorten Url Error: ${error}`);
  }
}

async function getAllUrls(userId) {
  try {
    return Url.find({ userId }).exec();
  } catch (error) {
    throw new Error(`Could not get all Urls: ${error}`);
  }
}

async function deleteShortUrl(urlId) {
  try {
    return Url.findByIdAndDelete(urlId).exec();
  } catch (error) {
    throw new Error(`Could not get all Urls: ${error}`);
  }
}

module.exports = {
  getUrl,
  createShortUrl,
  getAllUrls,
  createCustomShortUrl,
  deleteShortUrl,
};
