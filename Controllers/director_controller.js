import Director_Model from "../Models/director_model.js";
export const CreateDirector=async(req,res)=>
{
  const director=req.body;
  const NewDirector=Director_Model(director);
  try {
      await NewDirector.save();
      res.status(201).json({message:"directed added"})
  } catch (error) {
      res.status(406).json({message:error.message})
  }
}
export const GetAllDirector=async(req,res)=>
{
    try {
        const AllDirector=await Director_Model.find().sort({name:1});
        res.status(200).json(AllDirector)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export const UpdateDirector=async(req,res)=>
{
    const updatedData=req.body;
    const id=req.params.id;
    try {
        await Director_Model.updateOne({_id:id},updatedData);
        res.status(201).json({message:"updated"})
    } catch (error) 
    {
        res.status(406).json({message:error.message})
    }

}
export const DirectorGetById=async(req,res)=>
{
   const id=req.params.id;
   try {
      const director= await Director_Model.findById(id);
      res.status(200).json(director);

   } catch (error) {
       res.status(406).json({message:error.message})
   }
}
export const DeleteDirector=async(req,res)=>
{
    const id=req.params.id;
    try {
        await Director_Model.findByIdAndRemove(id);
        res.status(200).json({message:"deleted"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}