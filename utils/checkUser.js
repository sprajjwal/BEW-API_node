const User = require("../models/users");
const jwt = require('jsonwebtoken')

const checkUser = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.pToken === "undefined" || req.cookies.pToken === null) {
    req.user = null;
    console.log("no user")
  } else {
    const token = req.cookies.pToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
    console.log("found user")
  }

  next();
};


module.exports = checkUser;