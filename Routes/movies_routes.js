import express from 'express';
import {RateLimiter,auth} from '../MiddleWares/AuthMiddleWare.js';
import { DeleteMovie,CreateMovie,UpdateMovie,GetAllMovies,GetMovieById,GetMoviesByGenre,UpdateMoviePoster,generateCsvFile } from '../Controllers/movies_controllers.js';
import { UserRegistrationValidation ,ActorsValidations,ReviewsValidations} from '../MiddleWares/validations.js';
import multer from 'multer';
const storage=multer.diskStorage(
    {
        destination:'./Upload/posters',
        filename:(req,file,cb)=>
        {
            return cb(null,`${file.fieldname}_${Date.now()}${file.originalname}`)
        }
    }
)
const posters=multer(
    {
        storage:storage,
        limits:{fileSize:1000000}
    }
)
const movie_router=express.Router();
movie_router.post('/movie/add',posters.single('poster'),auth,CreateMovie)
movie_router.get('/movie/get',auth,GetAllMovies)
movie_router.delete('/movieDelete/:id',auth,DeleteMovie)
movie_router.get('/movieGetById/:id',auth,GetMovieById)
movie_router.put('/moiveReviewsUpdate/:id',ReviewsValidations,auth,UpdateMovie)
movie_router.get('/getByGenre/',GetMoviesByGenre)
movie_router.put('/updatePoster/:id',posters.single('poster'),UpdateMoviePoster)
movie_router.get('/generateCsv',generateCsvFile)
export default movie_router;
