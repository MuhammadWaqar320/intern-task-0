import MovieModel from '../Models/movies_model.js';
import {okHttpResponse,createdHttpResponse, serverErrorHttpResponse } from "../Response/responseHelper.js";
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
        createdHttpResponse(res,{message:"movie created"})
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const GetAllMovies=async(req,res)=>
{
    try {
        const AllMovies=await MovieModel.find().populate('actors._id').populate('directors._id').sort({name:1});
        okHttpResponse(res,AllMovies)
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const GetMovieById=async(req,res)=>
{
    const id=req.params.id;
    try {
        const Movie=await MovieModel.findById(id);
        res.status(200).json(Movie)
        okHttpResponse(res,Movie)

    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const UpdateMovie=async(req,res)=>
{
    const id=req.params.id;
    let {Reviews}=req.body;
    const Old_Movie=await MovieModel.findById(id);
    const {reviews}=Old_Movie;
    reviews.push(Reviews)
    const avg_rating=CalculateAvgRating(reviews); 

           try {
            await MovieModel.updateOne({_id:id},{avg_rating:avg_rating,reviews:reviews});
            createdHttpResponse(res,{message:"movie updated"})
        } catch (error) {
            serverErrorHttpResponse(res,error);
        }
}
export const DeleteMovie=async(req,res)=>
{
    const id=req.params.id;
    try {
        await MovieModel.findByIdAndRemove(id);
        okHttpResponse(res,{message:'movie deleted'})

    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const GetMoviesByGenre=async(req,res)=>
{
    const GenreMoviesArray=[{genre:"",Movies:[]}];
    var genre=[];
    try {
        await MovieModel.find().populate('actors._id').populate('directors').exec().then((movies)=>
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
        okHttpResponse(res,GenreMoviesArray.slice(1))
        });
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const UpdateMoviePoster=async(req,res)=>
{
    const id=req.params.id;
    try {
        await MovieModel.updateOne({_id:id},{poster:`${process.env.CLIENT_URL}/profile/${req.file.filename}`})
        okHttpResponse(res,{message:"poster  updated"})

    } catch (error) {
        serverErrorHttpResponse(res,error);
        
    }
}
export const generateCsvFile=async(req,res)=>
{
    try {
        const allMovies=await MovieModel.find();
        const csv = new ObjectsToCsv(allMovies);
        await csv.toDisk('./Upload/all_movies_csv/allMovies.csv');
        okHttpResponse(res,{message:"csv file generated and saved."})

    } catch (error) {
        serverErrorHttpResponse(res,error);
        
    }
}
