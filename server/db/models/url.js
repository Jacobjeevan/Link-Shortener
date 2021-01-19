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
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "urls",
  }
);

module.exports = mongoose.model("Url", UrlSchema);
