
import mongoose from "mongoose";
import Actors_Model from "./actors_model.js";
const Movies_Schema=mongoose.Schema(
    {
        name:{type:String,required:true},
        genre:{type:String,required:true},
        actors:{type:Array,"default":[]},
        business_done:{type:Number,required:true},
        rating:{type:Number,required:true},
        reviews:{type:String,required:true}
    }
  

)


const Movie_Model=mongoose.model('Movies',Movies_Schema);
export default Movie_Model