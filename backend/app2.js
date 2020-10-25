const express = require('express')
const func = require('./mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.post('/products', func.createProducts)

app.get('/products', func.getProducts)


app.listen(3000)
