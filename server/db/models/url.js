const mongoose = require("mongoose");

const { Schema } = mongoose;
const UrlSchema = new Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "urls",
  }
);

module.exports = mongoose.model("Url", UrlSchema);
