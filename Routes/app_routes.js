import express from 'express'
import { CreateActors ,GetAllActors,DeleteActors, UpdateActors, GetActorsById} from '../Controllers/actors_controllers.js';
import { CreateUser,LoginUser,LogoutUser } from '../Controllers/user_controllers.js';
import { DeleteMovie,CreateMovie,UpdateMovie,GetAllMovies,GetMovieById,GetMoviesByGenre,CalculateBusiness } from '../Controllers/movies_controllers.js';
import auth from '../MiddleWares/AuthMiddleWare.js';
const router=express.Router()
// actor's routes are here
router.post('/actors/add',CreateActors)
router.get('/actors/get',GetAllActors)
router.get('/actorsgetbyid/:id',auth,GetActorsById)
router.delete('/actorsDelete/:id',DeleteActors)
router.put('/actorsUpdate/:id',UpdateActors)
// user's routes are here
router.get('/user/logout',auth,LogoutUser)
router.post('/user/add',CreateUser)
router.post('/user/login',LoginUser)
// movies's routes are here
router.post('/movie/add',CreateMovie)
router.get('/movie/get',GetAllMovies)
router.delete('/movieDelete/:id',DeleteMovie)
router.get('/movieGetById/:id',GetMovieById)
router.put('/moiveUpdate/:id',UpdateMovie)
router.get('/getByGenre/:genre',GetMoviesByGenre)

// router.post('/movie/add',auth,CreateMovie)
// router.get('/movie/get',auth,GetAllMovies)
// router.delete('/movieDelete/:id',auth,DeleteMovie)
// router.delete('/movieGetById/:id',auth,GetMovieById)
// router.put('/moiveUpdate/:id',auth,UpdateMovie)
// router.get('/getByGenre/:genre',auth,GetMoviesByGenre)
export default router