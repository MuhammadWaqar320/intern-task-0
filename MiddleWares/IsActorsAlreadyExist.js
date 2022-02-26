import Actors_Model from '../Models/actors_model.js';
const actorsExist=async(req,res,next)=>
{
    const Actors=req.body.actors;
    const check=0;
    // for(i=0;i<Actors.length;i++)
    // {
        console.log()
        try {
            await Actors_Model.find({name:Actors[1].name}).exec().then((result)=>
            {
                check++;
                next();
            });
          
        } catch (error) {
            res.status(400).json({message:"actors is not exist"})
            // break;
        }
    //    if(check==Actors.length)
    //    {
    //        next();
    //    }
        
    // }
}
export default actorsExist