const mongoose = require('mongoose')
const Product = require('./models/productschema')

const url =
  "mongodb+srv://gdai:RGt4GDz2mcR4xs9F@cluster0.dxgwg.mongodb.net/node-database?retryWrites=true&w=majority";

  mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
      console.log("Connected to mongoDb")
  }).catch(err=>console.log(err))


const createProducts = async (req,res,next) => {
    const createdProduct = new Product({
        name:req.body.name,
        price:req.body.price
    })
    const result = await createdProduct.save();

    res.json(result)
}


const getProducts = async (req,res,next) =>{
    const products =await Product.find().exec()
    res.json(products)
}

module.exports = {
    createProducts,
    getProducts
  };