const express = require("express")
const bodyPaser = require("body-parser")

const placesRoutes = require('./routes/places-routes')

const app = express()

app.use(placesRoutes)





app.listen(5000)