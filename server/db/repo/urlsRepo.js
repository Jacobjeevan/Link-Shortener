const { redisDB } = require("../db/redisDB"),
  Str = require("@supercharge/strings");

async function getUrl(shortUrl) {
  try {
    let url = await redisDB.get(shortUrl);
    return url ? url : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Get Url By Short Url Error: ${error}`);
  }
}

async function getShortUrl(url) {
  try {
    let shortUrl = await redisDB.get(url);
    return shortUrl ? shortUrl : null;
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

async function shortenUrl(url) {
  try {
    const shortUrl = Str.random(5);
    await redisDB.set(shortUrl, url);
    await redisDB.set(url, shortUrl);
    return shortUrl;
  } catch (error) {
    console.log(error);
    throw new Error(`Shorten Url Error: ${error}`);
  }
}

module.exports = { getUrl, createShortUrl };
