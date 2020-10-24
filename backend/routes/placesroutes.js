const express = require("express");
const {getPlaceById,getPlaceByUserId, createPlace} =require('../controllers/placecontrollers')

//calling router method
const router = express.Router();

//routes
router.get("/:pid",getPlaceById);
router.get("/users/:uid",getPlaceByUserId);
router.post("/",createPlace);

//exports
module.exports = router;
