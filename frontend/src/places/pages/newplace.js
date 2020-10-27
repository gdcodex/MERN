import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/formelements/input";
import Button from "../../shared/components/formelements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "./../../shared/Util/validators";
import "./placeform.css";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const NewPlace = () => {
  const {
    isLoading,
    isError,
    resetError,
    isSuccess,
    resetSuccess,
    sendRequest,
  } = useHttp();

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
    },
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
     sendRequest(
      "http://localhost:5000/api/places",
      "POST",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        address: formState.inputs.address.value,
        creator: "5f96e0f6a80fa8b1ecde4143",
      })
    );
    console.log(formState);
  };

  return (
    <>
      {isError && (
        <div className="center">
          <ErrorModal header="Error !!" error={isError} onClear={resetError} />
        </div>
      )}
      {isSuccess && (
        <ErrorModal
          error="Place succesfully shared"
          header="Congrtulations !!"
          onClear={resetSuccess}
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
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
