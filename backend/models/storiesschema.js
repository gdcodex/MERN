const mongoose = require('mongoose');
const ttl = require('mongoose-ttl')
const Schema = mongoose.Schema;

const storiesSchema = new Schema({
    caption:{type:String,required:true},
    storyUrl:{type:String, required:true},
    creator: {type: mongoose.Types.ObjectId, required: true, ref:"User" },
    imageUrl:{type:String,required:true},
    
},{timestamps:true});
storiesSchema.plugin(ttl,{ttl:'1d'})

module.exports = mongoose.model("Story",storiesSchema);