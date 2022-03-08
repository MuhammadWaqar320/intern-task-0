import express from 'express';
import { createActors ,getAllActors,deleteActors, updateActors, getActorsById,calculateBusiness,updateProfile,getDataFromApi} from '../Controllers/actors_controllers.js';
import { userRegistrationValidation ,actorsValidations,reviewsValidations} from '../MiddleWares/validations.js';
import {rateLimiter,auth} from '../MiddleWares/AuthMiddleWare.js';
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

actor_router.post('/actors/add',actorsProfileImages.single('profile'),actorsValidations,createActors)
actor_router.get('/actors/get',getAllActors)
actor_router.get('/actorsgetbyid/:id',auth,getActorsById)
actor_router.delete('/actorsDelete/:id',deleteActors)
actor_router.put('/actorsUpdate/:id',updateActors)
actor_router.get('/businessByActor/:id',calculateBusiness)
actor_router.put('/updateProfile/:id',actorsProfileImages.single('profile'),updateProfile)
actor_router.get('/getDataFromDummyApi',actorsProfileImages.single('profile'),getDataFromApi)
export default actor_router;