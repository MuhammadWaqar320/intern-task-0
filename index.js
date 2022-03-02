import Express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import actor_router from './Routes/actors_routes.js';
import user_router from './Routes/user_routes.js';
import movie_router from './Routes/movies_routes.js';
import director_router from './Routes/director_routes.js';
const app=Express()
const Cors=cors()
app.use(bodyParser.json({limit:'20mb',extended:true}))
app.use(bodyParser.urlencoded({limit:"20mb",extended:true}))
app.use(Cors)
app.use(cookieParser())

// actor's routes are here
app.use(actor_router)
// movies's routes are here
app.use(movie_router)
// user's routes are here
app.use(user_router)
// director's routes are here
app.use(director_router)
const PORT=process.env.PORT||8000
const connection_string="mongodb+srv://waqar:1234@movies-databas.ygkit.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connection_string,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>app.listen(PORT,()=>
{
    console.log(`server is running on ${PORT}`)
})
).catch((error)=>console.log(error.message))

