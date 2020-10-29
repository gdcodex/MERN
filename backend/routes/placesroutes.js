const express = require("express");
const { check } = require("express-validator");

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placecontrollers");

//calling router method
const router = express.Router();

//routes
router.get("/:pid", getPlaceById);
router.get("/users/:uid", getPlacesByUserId); //multiple middlewares can be added which will be executed from left
router.patch(
  "/:pid",
  [check("title").notEmpty(), check("description").isLength({ min: 5 })],
  updatePlace
); //to right
router.delete("/:pid", deletePlace);
router.post(
  "/", 
  [
    check("title").notEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").notEmpty(),
  ],
  createPlace
);

//exports
module.exports = router;
