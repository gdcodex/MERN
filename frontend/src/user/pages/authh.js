import React, { useContext, useState } from "react";
import Button from "../../shared/components/formelements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from "../../shared/components/formelements/input";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttp } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Util/validators";

function Auth() {
  const auth = useContext(AuthContext);
  const [isLoggedInMode, setisLoggedInMode] = useState(true);
  const {
    isLoading,
    isError,
    resetError,
    isSuccess,
    resetSuccess,
    sendRequest,
  } = useHttp();

  const [formState, inputHandler, setInputData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!isLoggedInMode) {
      sendRequest(
        "http://localhost:5000/api/users/signup",
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        })
      );
    } else {
      sendRequest(
        "http://localhost:5000/api/users/login",
        "POST",

        { "Content-Type": "application/json" },
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        auth.login
      );
    }
  };

  const switchMode = () => {
    if (isLoggedInMode) {
      setInputData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
        },
        false
      );
    } else {
      setInputData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }
    setisLoggedInMode((p) => !p);
  };

  return (
    <>
      {isError && (
        <ErrorModal
          error={isError}
          header="An Error Occurred"
          onClear={resetError}
        />
      )}
      {isSuccess && (
        <ErrorModal
          error="User Succesfully Created"
          header="Congrtulations !!"
          onClear={resetSuccess}
        />
      )}
      <Card className="place-form">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoggedInMode ? "LOGIN" : "SIGNUP"}</h2>
        <form onSubmit={onSubmitHandler}>
          {!isLoggedInMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
              isSuccess={isSuccess}
            />
          )}

          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Enter a valid email"
            onInput={inputHandler}
            isSuccess={isSuccess}
          />

          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Enter a valid password"
            onInput={inputHandler}
            isSuccess={isSuccess}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoggedInMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchMode}>
          Go to {isLoggedInMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
}

export default Auth;
