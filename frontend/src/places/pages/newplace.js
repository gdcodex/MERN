import React, {useState, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";

import Input from "../../shared/components/formelements/input";
import Button from "../../shared/components/formelements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "./../../shared/Util/validators";
import "./placeform.css";
import { useForm } from "../../shared/hooks/form-hooks";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Imageupload from "../../shared/components/formelements/imageupload";

const NewPlace = () => {
  const UID = useContext(AuthContext)
  const [isSuccess, setisSuccess] = useState(false);
  const [isError, setisError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image:{
        value: null,
        isValid: false
      }
    },
    false
  );
 
  const onSubmitHandler = async(event) => {
    event.preventDefault();
    setisLoading(true);
     var formdata = new FormData();
      formdata.append("title", formState.inputs.title.value);
      formdata.append("description", formState.inputs.description.value);
      formdata.append("address", formState.inputs.address.value);
      formdata.append("image", formState.inputs.image.value);
      formdata.append("creator", UID.userId );

      var requestOptions = {
        method: "POST",
        headers:{Authorization: 'Bearer ' + UID.token},
        body: formdata,
        redirect: "follow",
      };
      try {
        const response = await fetch(
          "http://localhost:5000/api/places",
          requestOptions
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setisLoading(false);
        setisSuccess(true);
      } catch (err) {
        console.log(err.message);
        setisLoading(false);
        setisError(err.message);
      }
   
  };

  return (
    <>
      {isError && (
        <div className="center">
          <ErrorModal header="Error !!" error={isError} onClear={()=>{setisError(false)}} />
        </div>
      )}
      {isSuccess && (
        <ErrorModal
          error="Place succesfully shared"
          header="Congrtulations !!"
          onClear={()=>{setisSuccess(false)}}
        />
      )}
      <form onSubmit={onSubmitHandler} className="place-form">
      {isLoading && <LoadingSpinner asOverlay />}
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
        <Imageupload center id="image" onInput={inputHandler} />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
