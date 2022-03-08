import express from 'express';
import {rateLimiter,auth} from '../MiddleWares/AuthMiddleWare.js';
import { deleteMovie,createMovie,updateMovie,getAllMovies,getMovieById,getMoviesByGenre,updateMoviePoster,generateCsvFile } from '../Controllers/movies_controllers.js';
import { userRegistrationValidation ,actorsValidations,reviewsValidations} from '../MiddleWares/validations.js';
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
movie_router.post('/movie/add',posters.single('poster'),auth,createMovie)
movie_router.get('/movie/get',auth,getAllMovies)
movie_router.delete('/movieDelete/:id',auth,deleteMovie)
movie_router.get('/movieGetById/:id',auth,getMovieById)
movie_router.put('/moiveReviewsUpdate/:id',reviewsValidations,auth,updateMovie)
movie_router.get('/getByGenre/',getMoviesByGenre)
movie_router.put('/updatePoster/:id',posters.single('poster'),updateMoviePoster)
movie_router.get('/generateCsv',generateCsvFile)
export default movie_router;
