const httpError = require("../models/errors");
const User = require('../models/usersschema')
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


const signUp = async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(new httpError("Enter the fields correctly",422))
    }
    const {name,email,password,places} = req.body
    
    let existingUser
    try{
       existingUser = await User.findOne({email})
    }
    catch(error){
        return next( new httpError("Something went wrong",500))
    }

    if(existingUser){
        return next(new httpError("Email already registered",422))
    }

   
   const user = new User({
        name,
        email,
        password,
        image:"https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/44/1540890998-twd-905-jld-0621-05297-rt.jpg",
        places
    })
    try{
      await  user.save()
    }
    catch(error){
        console.log(error)
        return next(new httpError("Sign Up failed",500))
    }
  
    res.status(201).json({user:user.toObject({getters:true})})

}

const logIn = async (req,res,next) => {
    const {email,password} = req.body
    
    let existingUser
    try{
       existingUser = await User.findOne({email})
    }
    catch(error){
        return next( new httpError("something went wrong",500))
    }

    if(!existingUser || existingUser.password !== password){
        return next(new httpError("Enter the correct info",401))
    }
    res.json({message:'logged in'})

}

module.exports={                                       
    getUsers,
    signUp,
    logIn
}