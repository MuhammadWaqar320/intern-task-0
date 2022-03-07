import Movie_Model from '../Models/movies_model.js';
import validator from 'validator';
import { CalculateAvgRating } from '../MiddleWares/validations.js';
import ObjectsToCsv from 'objects-to-csv';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const CreateMovie=async(req,res)=>
{
    const {name,genre,actors,business_done,reviews,directors}=req.body;
   const avg_rating=CalculateAvgRating(reviews)
    try {
        const NewMovie=Movie_Model({poster:`${process.env.CLIENT_URL}/profile/${req.file.filename}`,name:name,genre:genre,actors:actors,business_done:business_done,avg_rating:avg_rating,reviews:reviews,directors:directors});
        await NewMovie.save();
        res.status(201).json({message:"movie added "})
    } catch (error) {
        res.status(406).json({message:error.message})
    }
}
export const GetAllMovies=async(req,res)=>
{
    try {
        const AllMovies=await Movie_Model.find().populate('actors._id').populate('directors._id').sort({name:1});
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
    let {Reviews}=req.body;
    const Old_Movie=await Movie_Model.findById(id);
    const {reviews}=Old_Movie;
    reviews.push(Reviews)
    const avg_rating=CalculateAvgRating(reviews); 

           try {
            await Movie_Model.updateOne({_id:id},{avg_rating:avg_rating,reviews:reviews});
            res.status(200).json({message:"movie updated successfully"})
        } catch (error) {
            res.status(406).json({message:error.message})
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
    var genre=[];
    try {
        await Movie_Model.find().populate('actors._id').populate('directors').exec().then((movies)=>
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
export const UpdateMoviePoster=async(req,res)=>
{
    const id=req.params.id;
    try {
        await Movie_Model.updateOne({_id:id},{poster:`${process.env.CLIENT_URL}/profile/${req.file.filename}`})
        res.status(200).json({message:"poster  updated"})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}
export const generateCsvFile=async(req,res)=>
{
    try {
        const allMovies=await Movie_Model.find();
        const csv = new ObjectsToCsv(allMovies);
         // Save into disl:
        await csv.toDisk('./Upload/all_movies_csv/allMovies.csv');
        res.status(200).json({message:"csv file generated and saved."})
    } catch (error) {
        res.status(5000).json({message:error.message})
        
    }
}

// }