import express from 'express';
import { CreateActors ,GetAllActors,DeleteActors, UpdateActors, GetActorsById,CalculateBusiness,updateProfile,getDataFromApi} from '../Controllers/actors_controllers.js';
import { UserRegistrationValidation ,ActorsValidations,ReviewsValidations} from '../MiddleWares/validations.js';
import {RateLimiter,auth} from '../MiddleWares/AuthMiddleWare.js';
import multer from 'multer';
const storage=multer.diskStorage(
    {
        destination:'./Upload/actorsProfile',
        filename:(req,file,cb)=>
        {
            console.log(`${file.fieldname}_${Date.now()}${file.originalname}`)
            return cb(null,`${file.fieldname}_${Date.now()}${file.originalname}`)
        }
    }
)
const actorsProfileImages=multer(
    {
        storage:storage,
        limits:{fileSize:1000000}
    }
)
const actor_router=express.Router();

actor_router.post('/actors/add',actorsProfileImages.single('profile'),ActorsValidations,CreateActors)
actor_router.get('/actors/get',GetAllActors)
actor_router.get('/actorsgetbyid/:id',auth,GetActorsById)
actor_router.delete('/actorsDelete/:id',DeleteActors)
actor_router.put('/actorsUpdate/:id',UpdateActors)
actor_router.get('/businessByActor/:id',CalculateBusiness)
actor_router.put('/updateProfile/:id',actorsProfileImages.single('profile'),updateProfile)
actor_router.get('/getDataFromDummyApi',actorsProfileImages.single('profile'),getDataFromApi)
export default actor_router;