import React from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/formelements/Button";
import Input from "../../shared/components/formelements/input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/Util/validators";


import "./placeform.css";

const DUMMY = [
  {
    id: "p1",
    title: "Skyring",
    description: "Times passes 5 years slower relative to 1 hr on earth",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/05/09/01/00/greece-3384386_1280.jpg",
    address: "77 Massachusetts Ave, Cambridge, MA 02139, United States",
    location: {
      lat: 42.360091,
      lng: -71.0963487,
    },
    creator: "u1",
  },
  {
    id: "p1",
    title: "Skyring",
    description: "Times passes 5 years slower relative to 1 hr on earth",
    imageUrl:
      "https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742_1280.jpg",
    address: "77 Massachusetts Ave, Cambridge, MA 02139, United States",
    location: {
      lat: 42.360091,
      lng: -71.0963487,
    },
    creator: "u2",
  },
];
function Updateplace() {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY.find((p) => p.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Couldn't find place</h2>
      </div>
    );
  }
  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        label="Title"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title.'
        onInput={()=>{}}
        valid={true}
        value={identifiedPlace.title}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description(min. 5 characters).'
        onInput={()=>{}}
        valid={true}
        value={identifiedPlace.description}
      />
      <Button type="submit" disabled={true}>UPDATE PLACE</Button>
    </form>
  );
}

export default Updateplace;
