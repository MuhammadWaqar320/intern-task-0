import Express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import Routes from './Routes/app_routes.js';
import cookieParser from 'cookie-parser';
const App=Express()
const Cors=cors()
App.use(bodyParser.json({limit:'20mb',extended:true}))
App.use(bodyParser.urlencoded({limit:"20mb",extended:true}))
App.use(Cors)
App.use(cookieParser())
App.use(Routes)
const PORT=process.env.PORT||8000
const connection_string="mongodb+srv://waqar:1234@movies-databas.ygkit.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connection_string,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>App.listen(PORT,()=>
{
    console.log(`server is running on ${PORT}`)
})
).catch((error)=>console.log(error.message))

