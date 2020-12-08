const express = require("express"),
  cors = require("cors"),
  session = require("express-session"),
  Redis = require("ioredis"),
  mongoose = require("mongoose"),
  /*MongoSanitize = require("express-mongo-sanitize"),
  morgan = require("morgan"),
  bcrypt = require("bcrypt"), */
  dotenv = require("dotenv"),
  UserRepo = require("./db/repo/userRepo");

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
  redisClient = new Redis({
    port: process.env.Redis_session_port,
    host: process.env.Redis_session_host,
    db: process.env.Redis_session_db,
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
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.Redis_session_secret,
    resave: false,
    name: process.env.Redis_session_name,
    saveUninitialized: false,
    cookie: {
      maxAge: Number(process.env.Redis_session_age),
      sameSite: true,
      secure: false,
    },
  })
);

app.use(async (req, res, next) => {
  const { user } = req.session;
  if (user) {
    const foundUser = await UserRepo.getUserById(user._id);
    res.locals.user = foundUser;
    req.session.user = foundUser;
  }
  next();
});

const urlRouter = require("./routes/urls");
const userRouter = require("./routes/users");

app.use("/", userRouter);
app.use("/", urlRouter);

app.listen(port, () => {
  console.log(`Server is currently running on the port: ${port}`);
});

mongoose.connect(process.env.Mongo_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

module.exports = app;
