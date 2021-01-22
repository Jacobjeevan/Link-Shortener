const { configure, getLogger, levels } = require("log4js");

const environment = process.env.NODE_ENV;

const appenderArray = ["console"];
if (environment === "production") {
  appenderArray.push("logstash");
}

configure({
  appenders: {
    console: { type: "console", layout: { type: "colored" } },
    logstash: {
      type: "log4js-logstash-tcp",
      host: "localhost",
      port: 5044,
    },
  },
  categories: {
    default: { appenders: ["console"], level: levels.ALL },
    dev: { appenders: appenderArray, level: levels.ALL },
    production: { appenders: appenderArray, level: levels.ALL },
  },
});

module.exports = getLogger(process.env.NODE_ENV);
