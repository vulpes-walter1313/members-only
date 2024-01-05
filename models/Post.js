const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const postSchema = Schema(
  {
    title: String,
    body: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

// Create a virtual to get a formatted date getter;
postSchema.virtual("createdFormatted").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

postSchema.virtual("updatedFormatted").get(function () {
  return DateTime.fromJSDate(this.updatedAt).toLocaleString(DateTime.DATE_MED);
});

// virtual to get a smaller amound of the body
postSchema.virtual("shortbody").get(function () {
  return this.body.split(" ").slice(0, 50).join(" ") + "...";
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
