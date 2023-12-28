const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB);
const connection = mongoose.connection;

connection.on("error", (err) => {
  console.log(err);
});

module.exports = connection;
