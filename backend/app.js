const express = require("express");
const bodyPaser = require("body-parser");
const httpError = require("./models/errors");
//routes import
const placesRoutes = require("./routes/placesroutes");
const userRoutes = require("./routes/userroutes");
//express call
const app = express();

//bodyPaser
app.use(bodyPaser.json())

//routes use
app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);



//error
app.use((req,res,next)=>{
    const error = new httpError("Couldn't find the route", 404) //overall error
    throw error //when synchronous / next() for asynchronous
})
app.use((error, req, res, next) => { //for a particular param
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message:error.message} || { message: "An unknown error occurred" });
});

//listen
app.listen(5000);
