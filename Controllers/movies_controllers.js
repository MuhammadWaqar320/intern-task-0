import MovieModel from '../Models/movies_model.js';
import {okHttpResponse,createdHttpResponse, serverErrorHttpResponse,ErrorMessageHttpResponse } from "../Response/responseHelper.js";
import { calculateAvgRating } from '../MiddleWares/validations.js';
import {Parser} from 'json2csv';
import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const createMovie=async(req,res)=>
{
    const {name,genre,actors,business_done,reviews,directors}=req.body;
   const avg_rating=calculateAvgRating(reviews)
    try {
        const newMovie=MovieModel({poster:`${process.env.CLIENT_URL}/profile/${req.file.filename}`,name:name,genre:genre,actors:actors,business_done:business_done,avg_rating:avg_rating,reviews:reviews,directors:directors});
        await newMovie.save();
        createdHttpResponse(res,{message:"movie created"})
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const getAllMovies=async(req,res)=>
{
    try {
        const allMovies=await MovieModel.find().populate('actors._id').populate('directors._id').sort({name:1});
        okHttpResponse(res,allMovies)
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const getMovieById=async(req,res)=>
{
    const id=req.params.id;
    try {
        const movie=await MovieModel.findById(id);
        res.status(200).json(movie)
        okHttpResponse(res,movie)

    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const updateMovie=async(req,res)=>
{
    const id=req.params.id;
    let {Reviews}=req.body;
    const old_Movie=await MovieModel.findById(id);
    const {reviews}=old_Movie;
    reviews.push(Reviews)
    const avg_rating=calculateAvgRating(reviews); 

           try {
            await MovieModel.updateOne({_id:id},{avg_rating:avg_rating,reviews:reviews});
            createdHttpResponse(res,{message:"movie updated"})
        } catch (error) {
            serverErrorHttpResponse(res,error);
        }
}
export const deleteMovie=async(req,res)=>
{
    const id=req.params.id;
    try {
        await MovieModel.findByIdAndRemove(id);
        okHttpResponse(res,{message:'movie deleted'})

    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const getMoviesByGenre=async(req,res)=>
{
    const genreMoviesArray=[{genre:"",Movies:[]}];
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
                        
                        genreMoviesArray.push({genre:uniqueGenre[i],Movies:[movies[j]]})
                    }     
               }   
            }
        okHttpResponse(res,genreMoviesArray.slice(1))
        });
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const updateMoviePoster=async(req,res)=>
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

            const allMovies=await MovieModel.find()
            const fields=['_id','name','genre','business_done','avg_rating','poster','actors']
            const json2csvParser = new Parser({fields,unwind:['actors']});
            const csv = json2csvParser.parse(allMovies);
            fs.writeFile('./Upload/all_movies_csv/allMovies.csv',csv,(error)=>
            {
                if(error)
                {
                    ErrorMessageHttpResponse(res,error)
                }
                else
                {
                    okHttpResponse(res,{message:"csv file generated and saved."})
                }
            })
          
    } catch (error) {
        serverErrorHttpResponse(res,error);
        
    }
}
