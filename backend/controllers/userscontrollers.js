const httpError = require("../models/errors");
const User = require('../models/usersschema')
const {validationResult} = require('express-validator')


const getUsers = async (req,res,next)=>{
    let users;
    try{
        users = await User.find({},'-password')
    }
    catch(error){
        console.log(error)
        return next(new httpError("an error occurred",500))
    }
    res.json({users:users.map(u=>u.toObject({getters:true}))})
}


const signUp = async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(new httpError("Enter the fields correctly",422))
    }
    const {name,email,password} = req.body
    
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
        
        places: []
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
    if(!existingUser){
        return next(new httpError("Email id not registered, please Sing Up first !",401))
    }

    if( existingUser.password !== password){
        return next(new httpError("Your email and password didn't match. Please try again !",401))
    }
    res.json({user:existingUser.toObject({getters:true})})

}

module.exports={                                       
    getUsers,
    signUp,
    logIn
}