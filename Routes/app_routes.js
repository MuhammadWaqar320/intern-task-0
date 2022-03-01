import express from 'express'
import { CreateActors ,GetAllActors,DeleteActors, UpdateActors, GetActorsById,CalculateBusiness} from '../Controllers/actors_controllers.js';
import { CreateUser,LoginUser,LogoutUser } from '../Controllers/user_controllers.js';
import { CreateDirector,DeleteDirector,GetAllDirector, UpdateDirector,DirectorGetById} from '../Controllers/director_controller.js';
import { DeleteMovie,CreateMovie,UpdateMovie,GetAllMovies,GetMovieById,GetMoviesByGenre } from '../Controllers/movies_controllers.js';
import auth from '../MiddleWares/AuthMiddleWare.js';
import { UserRegistrationValidation ,ActorsValidations} from '../MiddleWares/validations.js';
const router=express.Router()
// actor's routes are here
router.post('/actors/add',ActorsValidations,CreateActors)
router.get('/actors/get',GetAllActors)
router.get('/actorsgetbyid/:id',auth,GetActorsById)
router.delete('/actorsDelete/:id',DeleteActors)
router.put('/actorsUpdate/:id',UpdateActors)
router.get('/businessByActor/:id',CalculateBusiness)
// user's routes are here
router.get('/user/logout',auth,LogoutUser)
router.post('/user/add',UserRegistrationValidation,CreateUser)
router.post('/user/login',LoginUser)
// movies's routes are here
router.post('/movie/add',auth,CreateMovie)
router.get('/movie/get',auth,GetAllMovies)
router.delete('/movieDelete/:id',auth,DeleteMovie)
router.get('/movieGetById/:id',auth,GetMovieById)
router.put('/moiveUpdate/:id',auth,UpdateMovie)
router.get('/getByGenre/',GetMoviesByGenre)

// director's routes are here
router.post('/director/add',CreateDirector)
router.get('/director/get',GetAllDirector)
router.delete('/directorDelete/:id',DeleteDirector)
router.put('/directorUpdate/:id',UpdateDirector)
router.get('/directorGetById/:id',DirectorGetById)
export default router