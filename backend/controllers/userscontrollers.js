const httpError = require("../models/errors");
const User = require("../models/usersschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    console.log(error);
    return next(new httpError("an error occurred", 500));
  }
  res.json({ users: users.map((u) => u.toObject({ getters: true })) });
};

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    return next(new httpError("Enter the fields correctly", 422));
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new httpError("Something went wrong", 500));
  }

  if (existingUser) {
    return next(new httpError("Email already registered", 422));
  }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new httpError("Something went wrong", 500));
  }

  const user = new User({
    name,
    email,
    password: hashPassword,
    image: req.file.path,
    places: [],
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return next(new httpError("Sign Up failed", 500));
  }
  let token;
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      "secret_token_gdai_nottobeshared",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new httpError("something went wrong", 500));
  }

  res.status(201).json({ userId: user.id, email: user.email, token });
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new httpError("something went wrong", 500));
  }
  if (!existingUser) {
    return next(
      new httpError("Email id not registered, please Sing Up first !", 401)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new httpError("Something went wrong", 500));
  }

  if (!isValidPassword) {
    return next(
      new httpError(
        "Your email and password didn't match. Please try again !",
        401
      )
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "secret_token_gdai_nottobeshared",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new httpError("something went wrong", 500));
  }

  res.json({ userId: existingUser.id, email: existingUser.email, token });
};

module.exports = {
  getUsers,
  signUp,
  logIn,
};
