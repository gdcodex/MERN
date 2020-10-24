const express = require("express")
const bodyPaser = require("body-parser")
//routes import
const placesRoutes = require('./routes/places-routes')
//express call
const app = express()



//routes use
app.use('/api/places',placesRoutes)



//listen
app.listen(5000)