import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/formelements/Button";
import Input from "../../shared/components/formelements/input";
import { useForm } from "../../shared/hooks/form-hooks";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Util/validators";

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

  const [formState, inputHandler,setInputData] = useForm(
      {
      title: {
        value: '',
        isValid: true,
    },
      description: {
        value: '',
        isValid: true,
    },
    },
    true
    );
    
  const identifiedPlace = DUMMY.find((p) => p.id === placeId);
useEffect(()=>{
    setInputData({
       title: {
           value: identifiedPlace.title,
           isValid: true,
       },
         description: {
           value: identifiedPlace.description,
           isValid: true,
       },
    },true)

},[setInputData,identifiedPlace])


  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Couldn't find place</h2>
      </div>
    );
  }
  const onSubmitHandler =event=>{
      event.preventDefault();
      console.log(formState)
  }
  if( !formState.inputs.title.value ){
      return <h2>Loading...</h2>
  }
 
  return (
     
    <form onSubmit={onSubmitHandler} className="place-form">
      <Input
        id="title"
        element="input"
        label="Title"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValid={formState.inputs.title.isValid}
        initialValue={formState.inputs.title.value}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description(min. 5 characters)."
        onInput={inputHandler}
        initialValid={formState.inputs.description.isValid}
        initialValue={formState.inputs.description.value}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}

export default Updateplace;
