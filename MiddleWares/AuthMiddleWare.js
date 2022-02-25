import JWT from 'jsonwebtoken'
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