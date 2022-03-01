import Movie_Model from '../Models/movies_model.js';
import validator from 'validator';
export const CreateMovie=async(req,res)=>
{
    const movie=req.body;
   
    try {
        const NewMovie=Movie_Model(movie);
        await NewMovie.save();
        res.status(201).json({message:"movie added "})
    } catch (error) {
        res.status(406).json({message:error.message})
    }
}
export const GetAllMovies=async(req,res)=>
{
    try {
        const AllMovies=await Movie_Model.find().populate('actors').populate('directors');
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
        res.status(406).json({message:error.message})
    }
}
export const UpdateMovie=async(req,res)=>
{
    const id=req.params.id;
    const UpdatedMovie=req.body;
    let {_Rating,_Reviews}=req.body;
    const Old_Movie=await Movie_Model.findById(id);
    const {reviews,rating}=Old_Movie;
    reviews.push(_Reviews)
    if(0>_Rating<6)
    {  
           if(rating>0)
           {
            _Rating=(_Rating+rating)/2;
        
           }
           try {
            await Movie_Model.updateOne({_id:id},{rating:_Rating,reviews:reviews});
            res.status(200).json({message:"movie updated successfully"})
        } catch (error) {
            res.status(406).json({message:error.message})
        }
           
   
    }
    else{
        res.status(406).json({message:"invalid rating"})
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
    const GenreMoviesArray=[{genre:"",Movies:[]}];
    const Movies=[];
    var genre=[];
    try {
        await Movie_Model.find().exec().then((movies)=>
        {
            for(let i=0;i<movies.length;i++)
            {
                    genre.push(movies[i].genre)  
            }
            let uniqueGenre = [...new Set(genre)];     
            for(let i=0;i<uniqueGenre.length;i++)
            {
               for(let j=0;j<movies.length;j++)
               {
                    if(uniqueGenre[i]==movies[j].genre)
                    {
                        GenreMoviesArray.push({genre:uniqueGenre[i],Movies:[movies[j]]})
                    }     
               }   
            }
            res.json(GenreMoviesArray.slice(1))
        });
    } catch (error) {
        res.status(406).json({message:error.message})
    }
}
