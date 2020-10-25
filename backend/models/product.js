const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type: Number, required:true}
})
module.exports = new mongoose.Model("Product",productSchema)