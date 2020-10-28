import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/formelements/Button";
import Input from "../../shared/components/formelements/input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttp } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Util/validators";

import "./placeform.css";

function Updateplace() {
  const placeId = useParams().placeId;
  const { isLoading, isError, resetError, sendRequest } = useHttp();
  const [loadedPlace, setloadedPlace] = useState(null);

  const [formState, inputHandler, setInputData] = useForm(
    {
      title: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    sendRequest(`http://localhost:5000/api/places/${placeId}`)
      .then((data) => {
        setloadedPlace(data.place);
        console.log(loadedPlace.title);
        setInputData(
          {
            title: {
              value: data.place.title,
              isValid: true,
            },
            description: {
              value: data.place.description,
              isValid: true,
            },
          },
          true
        );
      })
      .catch((err) => console.log(err));
  },[placeId,sendRequest,setInputData]);


  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!loadedPlace && !isError) {
    return (
      <div className="center">
        <Card>
          <h2>Couldn't find place</h2>
        </Card>
      </div>
    );
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <>
      {isError && (
        <ErrorModal header="Error" error={isError} onClear={resetError} />
      )}
      {!isLoading && loadedPlace && (
        <form onSubmit={onSubmitHandler} className="place-form">
          <Input
            id="title"
            element="input"
            label="Title"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValid={true}
            initialValue={loadedPlace.title}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description(min. 5 characters)."
            onInput={inputHandler}
            initialValid={true}
            initialValue={loadedPlace.description}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
}

export default Updateplace;
