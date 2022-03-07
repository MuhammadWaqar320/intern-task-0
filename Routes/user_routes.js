import express from 'express';
import {RateLimiter,auth} from '../MiddleWares/AuthMiddleWare.js';
import { UserRegistrationValidation ,ActorsValidations,ReviewsValidations} from '../MiddleWares/validations.js';
import { CreateUser,LoginUser,LogoutUser,ActivateUserEmail,forgetpassword,resetPassword } from '../Controllers/user_controllers.js';
const user_router=express.Router();


// user's routes are here
user_router.get('/user/logout',auth,LogoutUser)
user_router.post('/user/add',UserRegistrationValidation,CreateUser)
user_router.post('/user/login',RateLimiter,LoginUser)
user_router.get('/user/activate/:token',ActivateUserEmail)
user_router.post('/user/forgetpassword',forgetpassword)
user_router.post('/user/reset/:token',resetPassword)
export default user_router;