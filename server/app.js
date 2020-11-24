const express = require("express"),
  cors = require("cors"),
  session = require("express-session"),
  redis = require("redis"),
  /* mongoose = require("mongoose"),
  MongoSanitize = require("express-mongo-sanitize"),
  morgan = require("morgan"),
  bcrypt = require("bcrypt"), */
  dotenv = require("dotenv");

let configPath = "./config/.env.prod";

if (process.env.NODE_ENV === "test") {
  configPath = "./config/.env.test";
} else if (process.env.NODE_ENV === "dev") {
  configPath = "./config/.env.dev";
}
dotenv.config({
  path: configPath,
});

let RedisStore = require("connect-redis")(session),
  redisClient = redis.createClient({
    port: process.env.Redis_session_port,
    host: process.env.Redis_session_host,
  });

redisClient.on("error", function (error) {
  console.error(error);
});

const app = express();
const port = process.env.PORT || 5000;

/* const store = new MongoDBStore({
  uri: process.env.Mongo_URI,
});
 */

app.use(express.json());
app.use(cors());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.Redis_session_secret,
    resave: false,
  })
);

const urlRouter = require("./routes/urls");

app.use("/", urlRouter);

app.listen(port, () => {
  console.log(`Server is currently running on the port: ${port}`);
});

module.exports = app;
