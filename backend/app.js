const express = require("express");
const bodyPaser = require("body-parser");
//routes import
const placesRoutes = require("./routes/placesroutes");
//express call
const app = express();

//routes use
app.use("/api/places", placesRoutes);
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json(error.message || { message: "An unknown error occurred" });
});

//listen
app.listen(5000);
