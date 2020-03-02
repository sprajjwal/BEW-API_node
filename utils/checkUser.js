const User = require("../models/users");
const jwt = require('jsonwebtoken')

const checkUser = (req, res, next) => {
  console.log("Checking authentication");

  if ((typeof req.body.token === "undefined" || req.body.token === null) || (typeof req.query.token === "undefined"
  || req.query.token === null)) {
    let token = "";
    if (req.body.token != null) {
      token = req.body.token;
    } else {
      token = req.query.token;
    }
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  } else {
    req.user = null;
    console.log("no user")
  }

  next();
};


module.exports = checkUser;