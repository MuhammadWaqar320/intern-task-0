import mongoose from "mongoose";
const Director_Schema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    gender:{type:String,required:true},
})
const Director_Model=mongoose.model('Directors',Director_Schema);
export default Director_Model;