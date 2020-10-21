import React from 'react'
import Button from '../../shared/components/formelements/Button'
import Input from '../../shared/components/formelements/input'
import { useForm } from '../../shared/hooks/form-hooks'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/validators'

function Auth() {
    const [formState,inputHandler] = useForm({
        email:{
            value:'',
            isValid:false
        },
        password:{
            value:'',
            isValid:false
        }
    },false)

    const onSubmitHandler= event=>{
        event.preventDefault();
        console.log(formState)

    }
    return (
      <form onSubmit={onSubmitHandler} className="place-form">
          <Input id="email" element="input" type="email" label="Email" validators={[VALIDATOR_REQUIRE,VALIDATOR_EMAIL]} errorText="Enter a valid email" onInput={inputHandler}/>
   
          <Input id="password" element="input" type="password" label="Password" validators={[VALIDATOR_MINLENGTH(6)]} errorText="Enter a valid email" onInput={inputHandler}/>
          <Button type="submit" disabled={!formState.isValid}>Create User</Button>
      </form>
    )
}

export default Auth
