const Str = require("@supercharge/strings"),
  Url = require("../models/url");
const { handleError } = require("../../helpers/errors");

async function getUrl(shortUrl) {
  try {
    const UrlEntry = await Url.findOne({ shortUrl });
    return UrlEntry ? UrlEntry.longUrl : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Get Url By Short Url Error: ${error}`);
  }
}

async function getShortUrl(longUrl) {
  try {
    const UrlEntry = await Url.findOne({ longUrl });
    return UrlEntry ? UrlEntry.shortUrl : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Get Short Url By Url Error: ${error}`);
  }
}

async function createShortUrl(url) {
  try {
    let shortUrl = await getShortUrl(url);
    if (!shortUrl) {
      shortUrl = await shortenUrl(url);
    }
    return shortUrl;
  } catch (error) {
    console.log(error);
    throw new Error(`Create Shorten Url Error: ${error}`);
  }
}

async function createCustomShortUrl(longUrl, shortUrl) {
  try {
    const existinglongUrl = await getUrl(shortUrl);
    if (existinglongUrl) {
      return false;
    }
    await Url.create({
      longUrl,
      shortUrl,
    });
    return true;
  } catch (error) {
    throw new Error(`Could not Create Custom Link: ${error}`);
  }
}

async function shortenUrl(longUrl) {
  try {
    const shortUrl = Str.random(5);
    await Url.create({
      longUrl,
      shortUrl,
    });
    return shortUrl;
  } catch (error) {
    console.log(error);
    throw new Error(`Shorten Url Error: ${error}`);
  }
}

async function getAllUrls() {
  try {
    return Url.find({}).exec();
  } catch (error) {
    throw new Error(`Could not get all Urls: ${error}`);
  }
}

module.exports = { getUrl, createShortUrl, getAllUrls, createCustomShortUrl };
