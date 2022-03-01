import UserRegister_Model from "../Models/user_model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { GenerateToken } from "../MiddleWares/AuthMiddleWare.js";
import nodemailer from 'nodemailer';
import transporter from "../MiddleWares/SendMail.js";
export const CreateUser=async(req,res)=>
{
    let mailOptions={
        from:process.env.EMAIL,
        to:req.body.email,
        subject:'Congratulations!',
        text:`${req.body.name}, you have been successfully registered.`,  
    }

    const user=req.body;
    const NewUser=UserRegister_Model({name:req.body.name,email:req.body.email,phone_Number:req.body.phone_Number,password:req.body.password})
    const isExist=await UserRegister_Model.findOne({email:req.body.email});
    if(isExist)
    {
       res.json({message:"Email is already exist"})
    }
    else
    {
        try {
            await NewUser.save();
            res.status(201).json({message:"user created successfully"})
            transporter.sendMail(mailOptions,(error)=>
            {
                if(error)
                {
                    console.log(error)
                }
            })
       } catch (error) {
           res.status(406).json({message:error.message});
       }
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