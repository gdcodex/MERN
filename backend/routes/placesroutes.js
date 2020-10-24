const express = require("express");
const {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placecontrollers");

//calling router method
const router = express.Router();

//routes
router.get("/:pid", getPlaceById);
router.get("/users/:uid", getPlaceByUserId);
router.patch("/:pid", updatePlace);
router.delete("/:pid", deletePlace);
router.post("/", createPlace);

//exports
module.exports = router;
