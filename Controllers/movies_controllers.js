import Movie_Model from '../Models/movies_model.js';

export const CreateMovie=async(req,res)=>
{
    const movie=req.body;
    const NewMovie=Movie_Model(movie);
    try {
        await NewMovie.save();
        res.status(200).json(NewMovie)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export const GetAllMovies=async(req,res)=>
{
    try {
        const AllMovies=await Movie_Model.find();
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
    try {
        await Movie_Model.updateOne({_id:id},UpdatedMovie);
        res.status(200).json({message:"movie updated successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
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