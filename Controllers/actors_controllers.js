import Actors_Model from "../Models/actors_model.js";
import Movie_Model from './../Models/movies_model.js';
import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import download from 'image-downloader';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const CreateActors=async(req,res)=>
{
 const {name,age,gender}=req.body;
    const NewActor= Actors_Model({name:name,age:age,gender:gender,profile:`${process.env.CLIENT_URL}/profile/${req.file.filename}`});
    try {
        await NewActor.save();
        res.status(201).json({message:"actor created successfully"});
    } catch (error) {
        res.status(406).json({message:error.message});
    }
}
export const updateProfile=async(req,res)=>
{
    const id=req.params.id;
    try {
        await Actors_Model.updateOne({_id:id},{profile:`${process.env.CLIENT_URL}/profile/${req.file.filename}`})
        res.status(200).json({message:"profile updated"})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}
export const GetAllActors=async(req,res)=>
{
  
     try {
        const AllActors=await Actors_Model.find().sort({name:1});
        res.status(200).json(AllActors);
     } catch (error) {
        res.status(400).json({message:error.message})
     }
}
export const DeleteActors=async(req,res)=>
{
    const id=req.params.id;
    try {
        await Actors_Model.findByIdAndRemove(id).exec();
        res.status(200).json({message:"deleted successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const GetActorsById=async(req,res)=>
{
    const id=req.params.id;
    try {
        const data=await Actors_Model.findById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export const UpdateActors=async(req,res)=>
{
    const id=req.params.id;
    const updatedData=req.body;
    try {
        await Actors_Model.updateOne({_id:id},updatedData)
        res.status(200).json({message:"updated successfully"})
    } catch (error) {
        res.status(406).json({message:error.message})
    }
}
export const CalculateBusiness=async(req,res)=>
{
    let _id=req.params.id;
    try {
        const sum=await  Movie_Model.aggregate([
          
               { $match:{ }},{
                    $group:{_id:'$actors._id',
                    Business_Done_By_Actor:{$sum:'$business_done'}}
                }
        
        ]);
      res.json(sum)  
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const getDataFromApi=async(req,res)=>
{
    const All_ActorsData=[];
    try {
            const {data}=await axios.get('https://dummyapi.io/data/v1/user',
            {
                headers:
                {
                    "app-id":"622458559bc1995235af5b25",
                },
                params:
                {
                    limit:50,
                    page:2,
                }
            })
            const all_Actors=data.data;
            for(let i in all_Actors)
            {
                if(i<100)
                {
                    const options = {
                        url: all_Actors[i].picture,
                        dest:path.join(__dirname, '../Upload/actorsProfile'),  
                      }

                      download.image(options)
                        .then(({ filename }) => {
                     
                        })
                        .catch((err) => console.error(err))
                  
                    if(all_Actors[i].title=='ms')
                    {
                        All_ActorsData.push({_id:all_Actors[i].id,name:all_Actors[i].firstName.concat(" ", all_Actors[i].lastName),gender:"female",profile:all_Actors[i].picture,age:""})
                    }
                    if(all_Actors[i].title=='mr')
                    {
                        All_ActorsData.push({_id:all_Actors[i].id,name:all_Actors[i].firstName.concat(" ", all_Actors[i].lastName),gender:"male",profile:all_Actors[i].picture,age:""})
                    }

                }
                else
                {
                    break;
                }

            }
            try {
                Actors_Model.insertMany(All_ActorsData,(error,docs)=>
                {
                    if(error)
                    {
                        res.status(500).json({message:error.message})
                    }
                    else
                    {
                        res.status(201).json({message:"All actors are added"})
                    }
                })
            } catch (error) {
                res.status(500).json({message:error.message})
            }
    } catch (error) 
    {
        res.json({message:error.message})
    }
    
}