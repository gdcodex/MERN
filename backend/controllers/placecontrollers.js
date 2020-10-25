const httpError = require("../models/errors");
const { v4: uuid } = require("uuid");
const {validationResult} =require('express-validator')
const getCoordinates = require('../utility/location')
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
  },{
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
const getPlaceById = (req, res, next) => {
  console.log("GET Place by Id");
  const placeId = req.params.pid; //{pid:'p1'}
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    return next(new httpError("Couldn't find place for the provided id", 404));
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  console.log("GET request in Users");
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);

  if (places.length===0) {
    return next(
      new httpError("Couldn't find place for the provided user id", 404)
    );
  }
  res.json({ places });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
   return next(new httpError("Please fill all the fields properly",422))
  }
  const { title, description, address, creator } = req.body;

  let coordinates;
  try{
     coordinates =await getCoordinates(address)
  }
  catch(error){
    return next(error)
  }
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location:coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    throw new httpError("Please give valid inputs",422)
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const placeToBeUpdated = { ...DUMMY_PLACES.find((p) => placeId === p.id) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => placeId === p.id);
  placeToBeUpdated.title = title;
  placeToBeUpdated.description = description;

  DUMMY_PLACES[placeIndex] = placeToBeUpdated;
  res.status(200).json({ place: placeToBeUpdated });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if(!DUMMY_PLACES.find((p) => p.id === placeId)){
    throw new httpError("Place with the given id doesn't exist",404)
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({message:"the place has been deleted"})
};

//exports
module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
