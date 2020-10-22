import React, { useContext, useState } from "react";
import Button from "../../shared/components/formelements/Button";
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
  const auth = useContext(AuthContext)
  const [isLoggedInMode, setisLoggedInMode] = useState(true);

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
    console.log(formState);
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
    } else  {
      setInputData(
        {...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid &&  formState.inputs.password.isValid
      );
    }
    setisLoggedInMode((p) => !p);
  };
  return (
    <Card className="place-form">
      <h2>{isLoggedInMode ? "LOGIN" : "SIGNUP"}</h2>
      <form onSubmit={onSubmitHandler}>
        {!isLoggedInMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}

        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_REQUIRE, VALIDATOR_EMAIL]}
          errorText="Enter a valid email"
          onInput={inputHandler}
        />

        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Enter a valid email"
          onInput={inputHandler}
        />
        <Button type="submit"  onClick={isLoggedInMode? auth.login:null} disabled={!formState.isValid}>
          {isLoggedInMode ? "LOGIN" : "SIGNUP"}
        </Button>
        <Button inverse onClick={switchMode}>
          Go to {isLoggedInMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </form>
    </Card>
  );
}

export default Auth;
