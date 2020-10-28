import React, { useRef } from 'react'
import Button from './Button'

import './imageupload.css';

function Imageupload() {
    const inputRef = useRef()

    const picked = ()=>{

    }

    const pickImage = () => {
        inputRef.current.click();
    }
    return (
        <div className='form-control'>
            <input ref={inputRef} type="file" name="" style={{display:'none'}} id={props.id} accept='.jpeg, .jpg, .png' onChange={picked}/>
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    <img src="" alt="preview"/>
                </div>
                <Button type='button' onClick={pickImage}>PICK IMAGE</Button>
            </div>
        </div>
    )
}

export default Imageupload
