import mongoose from "mongoose";
const DirectorSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    gender:{type:String,required:true},
})
const Director_Model=mongoose.model('Directors',DirectorSchema);
export default Director_Model;