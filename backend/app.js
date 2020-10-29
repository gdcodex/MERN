const express = require("express");
const fs = require('fs');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const httpError = require("./models/errors");
const placesRoutes = require("./routes/placesroutes");
const userRoutes = require("./routes/userroutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS, POST, DELETE, PATCH");
  next();
});

//routes use
app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

//error
app.use((req, res, next) => {
  const error = new httpError("Couldn't find the route", 404); //overall error
  throw error;
});
app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path,(err)=>{console.log(err)})
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json(
    { message: error.message } || { message: "An unknown error occurred" }
  );
});

const url =
  "mongodb+srv://gdai:RGt4GDz2mcR4xs9F@cluster0.dxgwg.mongodb.net/mern?retryWrites=true&w=majority";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to mongoDb");
    app.listen(5000);
  })
  .catch((err) => console.log(err));
