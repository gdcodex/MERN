const httpError = require("../models/errors");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Story = require('../models/storiesschema');
const User = require("../models/usersschema"); 


const createStory =async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new httpError("Please fill all the fields properly", 422));
    }
  
    const {caption, storyUrl } = req.body;
    console.log(req.userData.name)
    const creadtedStory = new Story({
        caption,
        storyUrl,
        creator:req.userData.userId,
        imageUrl:req.userData.imageUrl
    })
    let user;
    try {
      user = await User.findById(req.userData.userId);
    } catch (error) {
      return next(new httpError("Something went wrong", 500));
    }
    if (!user) return next(new httpError("Sorry you don't have an account, please create one !", 404));

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await creadtedStory.save({ session: sess });
        user.stories.push(creadtedStory); //push adds story's id to user
        await user.save({ session: sess });
        await sess.commitTransaction(); //only at this point the docs will be saved
      } catch (error) {
        console.log(error);
        return next(new httpError("Couldn't save story to the database", 500));
      }
      res.status(201).json({story:creadtedStory})
}


const getStories =async (req,res,next) =>{
  let stories;
  try {
    // stories = await User.find({ stories: { $exists: true, $ne: [] } })
    stories = await Story.find().sort({createdAt: -1})
    if(!stories || stories.length===0)   return next(new httpError("an error occurred", 500));
  } catch (error) {
    return next(new httpError("an error occurred", 500));
  }
  res.json({ stories: stories.map((u) => u.toObject({ getters: true })) });
}


// await User.find({ stories: { $exists: true, $ne: [] } })
const getStoriesByUser =async (req,res,next) =>{
  const userId = req.params.sid;
  let stories;
  try {
    stories = await User.findById(userId).populate("stories")
    // stories = await Story.find();
  } catch (error) {
    return next(new httpError("an error occurred", 500));
  }
  if (!stories) {
    return next(
      new httpError("Couldn't find place for the provided user id", 404)
    );
  }


  res.json({ stories: stories.stories.map((u) => u.toObject({ getters: true })) });
}






module.exports= {
    createStory,
    getStories,
    getStoriesByUser
}