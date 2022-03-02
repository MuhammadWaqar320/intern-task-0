import express from 'express';
import {RateLimiter,auth} from '../MiddleWares/AuthMiddleWare.js';
import { DeleteMovie,CreateMovie,UpdateMovie,GetAllMovies,GetMovieById,GetMoviesByGenre } from '../Controllers/movies_controllers.js';
import { UserRegistrationValidation ,ActorsValidations,ReviewsValidations} from '../MiddleWares/validations.js';
const movie_router=express.Router();
movie_router.post('/movie/add',auth,CreateMovie)
movie_router.get('/movie/get',auth,GetAllMovies)
movie_router.delete('/movieDelete/:id',auth,DeleteMovie)
movie_router.get('/movieGetById/:id',auth,GetMovieById)
movie_router.put('/moiveReviewsUpdate/:id',ReviewsValidations,auth,UpdateMovie)
movie_router.get('/getByGenre/',GetMoviesByGenre)
export default movie_router;
