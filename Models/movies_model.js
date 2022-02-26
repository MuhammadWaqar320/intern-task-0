
import mongoose from "mongoose";
import { Actors_Schema } from "./actors_model.js";
import Actors_Model from "./actors_model.js";
const { Schema } = mongoose;
const Movies_Schema=mongoose.Schema(
    {
        name:{type:String,required:true},
        genre:{type:String,required:true},
        actors:[{type:Schema.Types.ObjectId,ref:'Actors'}],
        business_done:{type:Number,required:true},
        rating:{type:Number,required:true},
        reviews:{type:String,required:true}
    }
  

)


const Movie_Model=mongoose.model('Movies',Movies_Schema);
export default Movie_Model