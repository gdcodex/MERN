const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://Myself:YLg3VwT9MKqrLZdn@cluster0.dxgwg.mongodb.net/node-database?retryWrites=true&w=majority";

const createProducts = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Couldn't store data" });
  }
  client.close();
  res.json(newProduct);
};

const getProducts = async (req, res, next) => {};

module.exports = {
  createProducts,
  getProducts,
};
