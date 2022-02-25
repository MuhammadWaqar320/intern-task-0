import UserRegister_Model from "../Models/user_model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
export const CreateUser=async(req,res)=>
{
  
    const user=req.body;
    const NewUser=UserRegister_Model({name:req.body.name,email:req.body.email,phone_Number:req.body.phone_Number,password:req.body.password})
    try {
         await NewUser.save();
         res.status(200).json({message:"user created successfully"})
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const LoginUser=async(req,res)=>
{
    const email=req.body.email;
    const password=req.body.password;
    await UserRegister_Model.find({email:email}).exec().then((user)=>
    {
        if(user.length>0)
        {
            bcrypt.compare(password, user[0].password, function(err, result) {
                if(err)
                {
                    res.json({message:'password is invalid'})
                }
                if(result==true)
                {
                    var token = jwt.sign({name:user[0].name,userId:user[0]._id,email:user[0].email}, 'secret', {expiresIn:"1h"},{ algorithm: 'RS256'});
                    res.cookie("jwt", token, {httpOnly: true,}).status(200).json({ message: `${user[0].name} You have Logged in successfully 😊 👌` });
                    console.log(req.cookies)
               
                }
                else
                {
                    res.json({message:'password is invalid'})  
                }
            });
    
        }
        else{
            res.json({message:"Email is invalid"})
        }
        
    }
    ).catch((error)=>
    {
        res.json({message:error.message})
    })

}
export const LogoutUser=(req,res)=>
{
    try {
       res.clearCookie("jwt")
       res.status(201).json({message:"logged out successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}