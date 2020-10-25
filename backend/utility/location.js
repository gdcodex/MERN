const axios = require("axios");
const httpError = require("../models/errors");
const API_KEY = "AIzaSyAGW_xTf2CEZN2uHt1M-2YJyQqna_fxATA";

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    throw new httpError("Enter the valid address", 422);
  }

  const coordinates = data
  return coordinates;
}

module.exports = getCoordsForAddress;
