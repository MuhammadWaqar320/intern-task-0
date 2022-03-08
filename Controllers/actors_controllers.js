import ActorsModel from "../Models/actors_model.js";
import MovieModel from './../Models/movies_model.js';
import { okHttpResponse,createdHttpResponse,serverErrorHttpResponse } from "../Response/responseHelper.js";
import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const createActors=async(req,res)=>
{
 const {name,age,gender}=req.body;
 console.log(`${process.env.CLIENT_URL}/profile/${req.file.filename}`)
    const NewActor= ActorsModel({name:name,age:age,gender:gender,profile:`${process.env.CLIENT_URL}/profile/${req.file.filename}`});
    try {
        await NewActor.save();
        createdHttpResponse(res,{message:"Actors created"})
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const updateProfile=async(req,res)=>
{
    const id=req.params.id;
    try {
        await ActorsModel.updateOne({_id:id},{profile:`${process.env.CLIENT_URL}/profile/${req.file.filename}`})
        okHttpResponse(res,{message:"Profile updated successfully"})
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const getAllActors=async(req,res)=>
{
  
     try {
        const AllActors=await ActorsModel.find().sort({name:1});
        okHttpResponse(res,AllActors)
     } catch (error) {
        serverErrorHttpResponse(res,error);
     }
}
export const deleteActors=async(req,res)=>
{
    const id=req.params.id;
    try {
        await ActorsModel.findByIdAndRemove(id).exec();
        okHttpResponse(res,{message:"deleted successfully"})
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}

export const getActorsById=async(req,res)=>
{
    const id=req.params.id;
    try {
        const data=await ActorsModel.findById(id);
        okHttpResponse(res,data)
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const updateActors=async(req,res)=>
{
    const id=req.params.id;
    const updatedData=req.body;
    try {
        await ActorsModel.updateOne({_id:id},updatedData)
        okHttpResponse(res,{message:"updated successfully"})
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
export const calculateBusiness=async(req,res)=>
{
    let _id=req.params.id;
    try {
        const sum=await  MovieModel.aggregate([
          
               { $match:{ }},{
                    $group:{_id:'$actors._id',
                    Business_Done_By_Actor:{$sum:'$business_done'}}
                }
        
        ]);
      res.json(sum)  
    } catch (error) {
        serverErrorHttpResponse(res,error);
    }
}
const downloadImage=(_url,filename)=>
{
    const _path=path.join(__dirname, `../Upload/actorsProfile/${filename}`);
    const localpath=fs.createWriteStream(_path);
    https.get(_url,(res)=>
    {
        res.pipe(localpath)
    })
}
const allActorsFromApi=(all_Actors)=>
{
    const All_ActorsData=[];
    for(let i in all_Actors)
    {
            const image_name = path.basename(all_Actors[i].picture);
            downloadImage(all_Actors[i].picture,image_name)
            if(all_Actors[i].title=='ms'||all_Actors[i].title=='mrs'||all_Actors[i].title=='miss')
            {
                All_ActorsData.push({name:all_Actors[i].firstName.concat(" ", all_Actors[i].lastName),gender:"female",profile:  `${process.env.CLIENT_URL}/profile/${image_name}`,age:""})
            }
            if(all_Actors[i].title=='mr')
            {
                All_ActorsData.push({name:all_Actors[i].firstName.concat(" ", all_Actors[i].lastName),gender:"male",profile:  `${process.env.CLIENT_URL}/profile/${image_name}`,age:""})
            }
            else
            {
                All_ActorsData.push({name:all_Actors[i].firstName.concat(" ", all_Actors[i].lastName),gender:"other",profile:  `${process.env.CLIENT_URL}/profile/${image_name}`,age:""})
            }
    }
    return (All_ActorsData)
}
export const getDataFromApi=async(req,res)=>
{

        try {
                const res1=await axios.get('https://dummyapi.io/data/v1/user',{
                headers:{"app-id":"622458559bc1995235af5b25",},params:{limit:50,page:0}})
                const all_Actors=res1.data.data;
                const res2=await axios.get('https://dummyapi.io/data/v1/user',{
                headers:{"app-id":"622458559bc1995235af5b25",},params:{limit:50,page:1}})
                const all_Actors1=res2.data.data;
                const actors_data=allActorsFromApi(all_Actors);
                const actor_data1=allActorsFromApi(all_Actors1);
                console.log(actor_data1.length)
                Array.prototype.push.apply(actors_data,actor_data1); 
                try 
                {
                    ActorsModel.insertMany(actors_data,(error,docs)=>
                    {
                        if(error)
                        {
                            serverErrorHttpResponse(res,error);
                        }
                        else
                        {
                            createdHttpResponse(res,{message:"All actors are added"})
                        }
                    })
                } catch (error) {
                    serverErrorHttpResponse(res,error);
                }
   
        } catch (error) 
        {
            serverErrorHttpResponse(res,error);
        }
}
