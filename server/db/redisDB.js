const asyncRedis = require("async-redis");
(dotenv = require("dotenv")), ({ promisify } = require("util"));

let configPath = "./config/.env.prod";

if (process.env.NODE_ENV === "test") {
  configPath = "./config/.env.test";
} else if (process.env.NODE_ENV === "dev") {
  configPath = "./config/.env.dev";
}
dotenv.config({
  path: configPath,
});

const redisDB = asyncRedis.createClient({
  port: process.env.RedisDB_port,
  host: process.env.RedisDB_host,
});

redisDB.on("error", function (error) {
  console.error(error);
});

module.exports = { redisDB };
