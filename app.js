import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import actor_router from './Routes/actors_routes.js';
import user_router from './Routes/user_routes.js';
import movie_router from './Routes/movies_routes.js';
import director_router from './Routes/director_routes.js';

const myapp=express()
const _cors=cors()

myapp.use(bodyParser.json({limit:'20mb',extended:true}))
myapp.use(bodyParser.urlencoded({limit:"20mb",extended:true}))
myapp.use(_cors)
myapp.use('/profile',express.static('Upload/actorsProfile'))
myapp.use('/poster',express.static('Upload/posters'))
myapp.use(cookieParser())
// actor's routes are here
myapp.use('/actor',actor_router)
// movies's routes are here
myapp.use('/movie',movie_router)
// user's routes are here
myapp.use('/user',user_router)
// director's routes are here
myapp.use('/director',director_router)
export default myapp;
