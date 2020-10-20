import React from 'react'

import Input from '../../shared/components/formelements/input'
import './newplace.css'

function Newplace() {
    return (
      <form  className="place-form">
          <Input element ='input' type='text' label='Title' />
      </form>
    )
}

export default Newplace
