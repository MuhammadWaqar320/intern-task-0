import JWT from 'jsonwebtoken';
export const GenerateToken=(user)=>
{
    const token=jwt.sign({name:user.name,userId:user._id,email:user.email}, 'secret', {expiresIn:"1h"},{ algorithm: 'RS256'});
    return token;
}
const auth=(req,res,next)=>
{
    const token=req.cookies.jwt;
   if(token)
   {
      try {
        const verified=JWT.verify(token,'secret');
        const decode=JWT.decode(token);
        next();
      } catch (error) {
        res.json({message:"token is not verified"})
      }
   }
   else
   {
       res.json({message:"Not Authorized"})
   }
}
export default auth