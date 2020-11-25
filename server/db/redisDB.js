const Redis = require("ioredis");
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

const redisDB = new Redis({
  port: process.env.RedisDB_port,
  host: process.env.RedisDB_host,
  db: process.env.RedisDB_db,
});

redisDB.on("error", function (error) {
  console.error(error);
});

module.exports = { redisDB };
