import UserRegister_Model from "../Models/user_model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {forgotPasswordToken, GenerateToken, GenerateEmailActivateToken } from "../MiddleWares/AuthMiddleWare.js";
import nodemailer from 'nodemailer';
import transporter from "../MiddleWares/SendMail.js";
import 'dotenv/config';
export const CreateUser=async(req,res)=>
{
    const url=process.env.CLIENT_URL;
    const NewUser=req.body;
    const isExist=await UserRegister_Model.findOne({email:req.body.email});
    if(isExist)
    {
       res.json({message:"Email is already exist"})
    }
    else
    {
      
        const token= GenerateEmailActivateToken(NewUser)
        let mailOptions={
            from:process.env.EMAIL,
            to:req.body.email,
            subject:'Activation Link',
            text:`
             please click on below link to activate your account \n
            ${url}/user/activate/${token} `,  
        }
        transporter.sendMail(mailOptions,(error)=>
        {
            if(error)
            {
                res.json({message:error.message})
            }
            else
            {
                res.status(200).json({message:"Please check your email account and verify it"})
            }
        })
    }
}
export const LoginUser=async(req,res)=>
{
    const {email,password}=req.body;
    try {
        const user=await UserRegister_Model.findOne({email:email});
        if(user)
        {
            bcrypt.compare(password, user.password, function(err, result) {
                if(err)
                {
                    res.json({message:'email or password is invalid'})
                }
                if(result==true)
                {
                    var token =GenerateToken(user)
                    res.cookie("jwt", token, {httpOnly: true,}).status(200).json({ message: `${user.name} You have Logged in successfully 😊 👌` });
                    // console.log(req.cookies)
               
                }
                else
                {
                    res.status(401).json({message:'Email or password is invalid'})  
                }
            }); 
        }
        else
        {
            res.status(401).json({message:"Email or password is invalid"})
        }
      
    } catch (error) {
        res.status(406).json({message:error.message})
    }
   
}
export const LogoutUser=(req,res)=>
{
    try {
       res.clearCookie("jwt")
       res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        res.status(406).json({message:error.message})
    }
}
export const ActivateUserEmail=async(req,res)=>
{
    const token=req.params.token;

    try {
        const verified=jwt.verify(token,process.env.EMAIL_ACTIVATE_TOKEN);
        const Newuser=jwt.decode(token,{complete:true})  
        const UserData=Newuser.payload;
        const NewUser=UserRegister_Model({name:UserData.name,email:UserData.email,phone_Number:UserData.phone_Number,password:UserData.password})
        try {
           await NewUser.save();
           res.status(201).json({message:`Congratulation! ${UserData.name} you have been registered successfully`})
           }
           catch (error)
           {
               res.status(406).json({message:error.message});
           }

      } catch (error) {
        res.json({message:"You are not authorized user so you can not registered"})
      }


       
}
export const forgetpassword=async(req,res)=>
{
  const {email}=req.body;
  console.log(email)
  const url=process.env.CLIENT_URL;
  const isExist=await UserRegister_Model.findOne({email:email});
  if(!isExist)
  {
      res.json({message:"Sorry email is not exist"})
  }
  else
  {
  
    const token=forgotPasswordToken({email:email});
console.log(token)
    let mailOptions={
        from:process.env.EMAIL,
        to:email,
        subject:'Activation Link',
        text:`
         please click on below link to forgot your password \n
        ${url}/user/reset/${token} `,  
    }
    transporter.sendMail(mailOptions,(error)=>
    {
        if(error)
        {
            res.json({message:error.message})
        }
        else
        {
            res.status(200).json({message:"Please check your email account for reset password"})
        }
    })
  }
}
// //////////////////////
export const resetPassword=async(req,res)=>
{
    const token=req.params.token;
    const {password}=req.body;
    console.log(token)
    try {
        const verified_token=jwt.verify(token,process.env.FORGOT_MAIL_KEY);
        const decodedToken=jwt.decode(token,{complete:true})
        const {email}=decodedToken.payload;
        try {
            await UserRegister_Model.updateOne({email:email},{password:password})
            res.status(200).json({message:"your password has been changed"})
        } catch (error) {
            res.status(500).json({message:error.message})            
        }       
    } catch (error) {
        res.json({message:"You are not authorized user"})        
    }
}



