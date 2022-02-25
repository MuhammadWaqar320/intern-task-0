import mongoose from "mongoose";
const Actors_Schema=mongoose.Schema(
    {
        name:{type:String},
        age:{type:Number},
        gender:{type:String}
    }
)
const Actors_Model=mongoose.model('Actors',Actors_Schema)
export default Actors_Model