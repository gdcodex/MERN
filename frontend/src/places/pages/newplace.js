import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/formelements/input";
import Button from "../../shared/components/formelements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "./../../shared/Util/validators";
import "./placeform.css";
import { useForm } from "../../shared/hooks/form-hooks";

   
const NewPlace = () => {
 const [formState, inputHandler]= useForm( {
      title:{
        value:"",
        isValid:false
      },
      description:{
        value:"",
        isValid:false
      },
      address:{
        value:"",
        isValid:false
      }
    }
    ,
     false,
  
  )



  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <form onSubmit={onSubmitHandler} className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
