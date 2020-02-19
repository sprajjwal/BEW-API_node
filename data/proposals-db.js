const mongoose = require("mongoose");
const assert =  require("assert")

const url = "mongodb://localhost:27017/proposals-db";
mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set('debug', true);

module.exports = mongoose.connection;