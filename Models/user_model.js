import bcrypt from "bcrypt";
import mongoose from "mongoose";
const UserReister_Schema=mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        phone_Number:{type:Number,required:true},
        password:{type:String,required:true}
    }
)
UserReister_Schema.pre('save',async function(next)
{
    try {
        const salt=await bcrypt.genSalt(10);
        const HashedPassword=await bcrypt.hash(this.password,salt);
        this.password=HashedPassword;
        console.log(this.password)
        next();
      
    } catch (error) {
        next(error)
    }
})
const UserRegister_Model=mongoose.model('User',UserReister_Schema)
export default UserRegister_Model;
