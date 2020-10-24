const express = require("express");
const U = require("../controllers/userscontrollers");

//calling router method
const router = express.Router();

//routes
router.get("/", U.getUsers);
router.post("/signup", U.signUp);
router.post("/login", U.logIn);

//exports
module.exports = router;

