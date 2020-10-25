const httpError = require("../models/errors");
const {validationResult} = require('express-validator')
const {v4:uuid} = require('uuid')

const DUMMY_USERS = [
    {
        id:"u2",
        name:"geremsa daimary",
        email:"gerema@gdai.com",
        password:"123gdai"
    }
]


const getUsers = (req,res,next)=>{
    res.json({users:DUMMY_USERS})
}


const signUp = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        throw new httpError("Enter the fields correctly",422)
    }
    const {name,email,password} = req.body
    const hasUser = DUMMY_USERS.find(u=>u.email===email)
    if(hasUser){
        return next( new httpError("Email already registered",401))
    }

    const createdUser = {
        id:uuid(),
        name,
        email,
        password
    }
    DUMMY_USERS.push(createdUser)
    res.status(201).json({user:createdUser})

}

const logIn = (req,res,next) => {
    const {email,password} = req.body
    const identifiedUser = DUMMY_USERS.find(p=>p.email===email)
    if(!identifiedUser || identifiedUser.password !== password){
        return next(new httpError("Enter the correct info",401))
    }
    res.json({message:'logged in'})

}

module.exports={
    getUsers,
    signUp,
    logIn
}