
import mongoose from "mongoose";
import { Actors_Schema } from "./actors_model.js";
import Actors_Model from "./actors_model.js";
const { Schema } = mongoose;
const Movies_Schema=mongoose.Schema(
    {
        name:{type:String,required:true},
        genre:{type:String,required:true},
        actors:[{_id:{type:Schema.Types.ObjectId,ref:'Actors'}}],
        business_done:{type:Number,required:true},
        avg_rating:{type:Number,required:true},
        reviews:[{name:String,feedback:String,rating:Number}],
        directors:[{_id:{type:Schema.Types.ObjectId,ref:'Directors'}}],
    }
)
const Movie_Model=mongoose.model('Movies',Movies_Schema);
export default Movie_Model