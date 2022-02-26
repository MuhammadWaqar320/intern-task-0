import Movie_Model from '../Models/movies_model.js';

export const CreateMovie=async(req,res)=>
{
    const movie=req.body;
   
    try {
        const NewMovie=Movie_Model(movie);
        await NewMovie.save();
        res.status(200).json(NewMovie)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export const GetAllMovies=async(req,res)=>
{
    try {
        const AllMovies=await Movie_Model.find().populate('actors');
        res.status(200).json(AllMovies)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export const GetMovieById=async(req,res)=>
{
    const id=req.params.id;
    try {
        const Movie=await Movie_Model.findById(id);
        res.status(200).json(Movie)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const UpdateMovie=async(req,res)=>
{
    const id=req.params.id;
    const UpdatedMovie=req.body;
    const {name,genre,rating,actors,business_done,reviews}=req.body;
    const Old_Movie=await Movie_Model.findById(id);
    if((rating==1)||(rating==2)||(rating==3)||(rating==4)||(rating==5))
    {
        const New_Rating=(rating+Old_Movie.rating)/2;
        try {
            await Movie_Model.updateOne({_id:id},{name:name,genre:genre,rating:New_Rating,reviews:reviews,actors:actors,business_done:business_done});
            res.status(200).json({message:"movie updated successfully"})
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }
    else{
        res.status(409).json({message:"invalid rating"})
    }
  
}
export const DeleteMovie=async(req,res)=>
{
    const id=req.params.id;
    try {
        await Movie_Model.findByIdAndRemove(id);
        res.status(200).json({message:'movie deleted'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export const GetMoviesByGenre=async(req,res)=>
{
    const genre=req.params.genre;
    try {
        await Movie_Model.find({genre:genre}).exec().then((movies)=>
        {
            res.status(200).json(movies);
        });
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export const CalculateBusiness=async(req,res)=>
{

}