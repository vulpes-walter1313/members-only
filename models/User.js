const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  password: String,
  member: Boolean,
  admin: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
