const httpError = require("../models/errors");
const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const getCoordinates = require("../utility/location");
const Place = require("../models/placeschema");
//data
let DUMMY_PLACES = [
  {
    id: "p1",
    title: "MIT",
    description: "Hella this is the greatest university",
    location: {
      lat: 70.46,
      lng: 54.45,
    },
    address: "69 Street, London",
    creator: "u1",
  },
  {
    id: "p2",
    title: "MIT",
    description: "Hella this is the greatest university",
    location: {
      lat: 70.46,
      lng: 54.45,
    },
    address: "69 Street, London",
    creator: "u1",
  },
];

//route functions
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

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    console.log(error);
    return next(
      new httpError("Couldn't find any place with the given user id", 500)
    );
  }

  if (places.length === 0) {
    return next(
      new httpError("Couldn't find place for the provided user id", 404)
    );
  }
  res.json({ places: places.map((p) => p.toObject({ getters: true })) });
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
    image: "https://news.bitcoin.com/wp-content/uploads/2019/03/apocalypse.png",
    creator,
  });

  try {
    await createdPlace.save();
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

  res.status(200).json({ place : place.toObject({getters: true}) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try{
    place = await Place.findById(placeId)
  }
  catch(error){
    console.log(error)
    return next(new httpError("couldn't find the place to be deleted",500))
  }
  try{
    await place.remove()
  }
  catch(error){
    console.log(error)
    return next(new httpError("couldn't delete the place",500))
  }
 
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
