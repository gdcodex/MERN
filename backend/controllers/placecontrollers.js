const fs = require("fs");
const httpError = require("../models/errors");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const getCoordinates = require("../utility/location");
const Place = require("../models/placeschema");
const User = require("../models/usersschema"); //to establish connection between users and places

////route functions
//getting place(s)
const getPlaceById = async (req, res, next) => {
  console.log("GET Place by Id");
  const placeId = req.params.pid; //{pid:'p1'}

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    console.log(error);
    return next(
      new httpError("Couldn't find any place with the given id", 500)
    );
  }

  if (!place) {
    return next(new httpError("Couldn't find place for the provided id", 404));
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  console.log("GET request in Users");
  const userId = req.params.uid;

  let userWithPlaces;
  try {
    // places = await Place.find({ creator: userId });
    userWithPlaces = await User.findById(userId).populate("places");
    // places-->userWithPlaces.places
  } catch (error) {
    console.log(error);
    return next(new httpError("Server error", 500));
  }

  if (!userWithPlaces) {
    return next(
      new httpError("Couldn't find place for the provided user id", 404)
    );
  }
  res.json({
    places: userWithPlaces.places.map((p) => p.toObject({ getters: true })),
  });
};

//createPlace
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new httpError("Please fill all the fields properly", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinates(address);
  } catch (error) {
    return next(error);
  }
  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    image: req.file.path,
    creator,
  });
  //check if user exists
  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(new httpError("Something went wrong", 500));
  }
  if (!user) return next(new httpError("Sorry you are not logged in", 404));

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace); //push adds place's id to user
    await user.save({ session: sess });
    await sess.commitTransaction(); //only at this point the docs will be saved
  } catch (error) {
    console.log(error);
    return next(new httpError("Couldn't save place to the database", 500));
  }

  res.status(201).json({ place: createdPlace });
};

//updatePlace
const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new httpError("Please give valid inputs", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    console.log(error);
    return next(
      new httpError("Something went wrong,could not find any such place", 500)
    );
  }
  if (req.userData.userId !== place.creator.toString()) {
    return next(
      new httpError(
        "You are blocked from making any changes !",
        401
      )
    );
  }
  place.title = title;
  place.description = description;
  try {
    place.save();
  } catch (error) {
    console.log(error);
    return next(
      new httpError("Something went wrong, could not save updated place", 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

//deleting place
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (error) {
    console.log(error);
    return next(new httpError("Something gone wrong", 500));
  }
  if (!place) return next(new httpError("The place doesn't exist", 404));

  console.log(place.creator.id);
  if(req.userData.userId !== place.creator.id){
    return next(new httpError('Your are not authorized to delete this place',401));
  }

  const placePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place); //connected established by pupilate method/ user ->place.creator
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(new httpError("couldn't delete the place", 500));
  }
  fs.unlink(placePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "the place has been deleted" });
};

//exports
module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
