import Director_Model from "../Models/director_model.js";
import { okHttpResponse,createdHttpResponse, serverErrorHttpResponse } from "../Response/responseHelper.js";
export const CreateDirector=async(req,res)=>
{
  const director=req.body;
  const NewDirector=Director_Model(director);
  try {
      await NewDirector.save();
      createdHttpResponse(res,{message:"Directors created"})
  } catch (error) {
    serverErrorHttpResponse(res,error);
  }
}
export const GetAllDirector=async(req,res)=>
{
    try {
        const AllDirector=await Director_Model.find().sort({name:1});
        okHttpResponse(res,AllDirector)
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const UpdateDirector=async(req,res)=>
{
    const updatedData=req.body;
    const id=req.params.id;
    try {
        await Director_Model.updateOne({_id:id},updatedData);
        createdHttpResponse(res,{message:"Updated"})
    } catch (error) 
    {
        serverErrorHttpResponse(res,error);
    }

}
export const DirectorGetById=async(req,res)=>
{
   const id=req.params.id;
   try {
      const director= await Director_Model.findById(id);
      okHttpResponse(res,director)
   } catch (error) {
    serverErrorHttpResponse(res,error);
   }
}
export const DeleteDirector=async(req,res)=>
{
    const id=req.params.id;
    try {
        await Director_Model.findByIdAndRemove(id);
        okHttpResponse(res,{message:"deleted"})
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}