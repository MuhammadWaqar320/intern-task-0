import Actors_Model from "../Models/actors_model.js";
import Movie_Model from './../Models/movies_model.js';
export const CreateActors=async(req,res)=>
{
    const actor=req.body;
    const NewActor= Actors_Model(actor);
    try {
        await NewActor.save();
        res.status(201).json({message:"actor created successfully"});
    } catch (error) {
        res.status(406).json({message:error.message});
    }
}
export const GetAllActors=async(req,res)=>
{
  
     try {
        const AllActors=await Actors_Model.find();
        res.status(200).json(AllActors);
     } catch (error) {
        res.status(400).json({message:error.message})
     }
}
export const DeleteActors=async(req,res)=>
{
    const id=req.params.id;
    try {
        await Actors_Model.findByIdAndRemove(id).exec();
        res.status(200).json({message:"deleted successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const GetActorsById=async(req,res)=>
{
    const id=req.params.id;
    try {
        const data=await Actors_Model.findById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export const UpdateActors=async(req,res)=>
{
    const id=req.params.id;
    const updatedData=req.body;
    try {
        await Actors_Model.updateOne({_id:id},updatedData)
        res.status(200).json({message:"updated successfully"})
    } catch (error) {
        res.status(406).json({message:error.message})
    }
}
export const CalculateBusiness=async(req,res)=>
{
    let _id=req.params.id;
    try {
        const sum=await  Movie_Model.aggregate([
          
               { $match:{ }},{
                    $group:{_id:'$actors._id',
                    Business_Done_By_Actor:{$sum:'$business_done'}}
                }
        
        ]);
      res.json(sum)  
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}