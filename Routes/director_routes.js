import express from 'express';
import {RateLimiter,auth} from '../MiddleWares/AuthMiddleWare.js';
import { CreateDirector,DeleteDirector,GetAllDirector, UpdateDirector,DirectorGetById} from '../Controllers/director_controller.js';
const director_router=express.Router();
// director's routes are here
director_router.post('/director/add',CreateDirector)
director_router.get('/director/get',GetAllDirector)
director_router.delete('/directorDelete/:id',DeleteDirector)
director_router.put('/directorUpdate/:id',UpdateDirector)
director_router.get('/directorGetById/:id',DirectorGetById)
export default director_router;