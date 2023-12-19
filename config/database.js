const mongoose = require("mongoose");

const connection = mongoose.createConnection(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("error", (err) => {
  console.log(err);
});

module.exports = connection;
