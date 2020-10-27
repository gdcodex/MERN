import React, { useContext, useState } from "react";
import Button from "../../shared/components/formelements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from "../../shared/components/formelements/input";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hooks";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Util/validators";

function Auth() {
  const auth = useContext(AuthContext);
  const [isLoggedInMode, setisLoggedInMode] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);

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

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setisLoading(true);
    if (!isLoggedInMode) {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
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
    } else {

      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        auth.login();
        console.log(responseData);
        setisLoading(false);
      } catch (err) {
        console.log(err.message);
        setisLoading(false);
        setisError(err.message);
      }

     
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
          onClear={() => setisError(null)}
        />
      )}
      {isSuccess && (
        <ErrorModal
          error="User Succesfully Created"
          header="Congrtulations !!"
          onClear={() => setisSuccess(false)}
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
