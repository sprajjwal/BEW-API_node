const User = require("../models/users");
const jwt = require('jsonwebtoken')

const checkUser = (req, res, next) => {
  console.log("Checking authentication");

  if ((typeof req.cookies.pToken === "undefined" || req.cookies.pToken === null) && (typeof req.body.token === "undefined"
  || req.body.token === null)) {
    req.user = null;
    console.log("no user")
  } else {
    let token = "";
    if (req.cookies.pToken != null) {
      token = req.cookies.pToken;
    } else {
      token = req.body.token;
    }
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};


module.exports = checkUser;