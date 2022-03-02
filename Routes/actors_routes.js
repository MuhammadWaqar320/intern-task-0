import express from 'express';
import { CreateActors ,GetAllActors,DeleteActors, UpdateActors, GetActorsById,CalculateBusiness} from '../Controllers/actors_controllers.js';
import { UserRegistrationValidation ,ActorsValidations,ReviewsValidations} from '../MiddleWares/validations.js';
import {RateLimiter,auth} from '../MiddleWares/AuthMiddleWare.js';
const actor_router=express.Router();
actor_router.post('/actors/add',ActorsValidations,CreateActors)
actor_router.get('/actors/get',GetAllActors)
actor_router.get('/actorsgetbyid/:id',auth,GetActorsById)
actor_router.delete('/actorsDelete/:id',DeleteActors)
actor_router.put('/actorsUpdate/:id',UpdateActors)
actor_router.get('/businessByActor/:id',CalculateBusiness)
export default actor_router;