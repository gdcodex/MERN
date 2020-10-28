const express = require("express");
const {check} =require('express-validator')
const U = require("../controllers/userscontrollers");
const fileUpload = require('../middleware/fileUpload');
//calling router method
const router = express.Router();

//routes
router.get("/", U.getUsers);
router.post("/signup",fileUpload.single('image'),[
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min:6})
], U.signUp);
router.post("/login", U.logIn);

//exports
module.exports = router;

