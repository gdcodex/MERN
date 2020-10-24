const express = require("express");
const {getPlaceById,getPlaceByUserId} =require('../controllers/placecontrollers')

const router = express.Router();



router.get("/:pid",getPlaceById);



router.get("/users/:uid",getPlaceByUserId);

module.exports = router;
