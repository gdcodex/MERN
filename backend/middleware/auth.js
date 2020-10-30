const jwt = require("jsonwebtoken");
const httpError = require("../models/errors");

module.exports = (req, res, next) => {
  let token;
  try {
    token = req.headers.authorization.split(" ")[1]; //authorization -> bearer token
    console.log('greg-----')
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken= jwt.verify(token,"secret_token_gdai_nottobeshared")
    req.userData = { userId: decodedToken.userId}  //attaching data
    next()
  } catch (err) {
    return next(new httpError("Authentication failed", 403));
  }
};