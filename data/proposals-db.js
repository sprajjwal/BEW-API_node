const mongoose = require("mongoose");
const assert =  require("assert")

const url = "mongodb://localhost:27017/proposals-db";
const heroku_url = "mongodb://<dbuser>:<dbpassword>@ds229118.mlab.com:29118/heroku_4gm3n5zp"
mongoose.Promise = global.Promise;
mongoose.connect(
  heroku_url,
  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set('debug', true);

module.exports = mongoose.connection;