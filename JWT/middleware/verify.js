const jwt = require('jsonwebtoken')
exports.verifyToken = (req,res,next)=>{
   try {
     var token = req?.cookies?.token
     console.log(token);
     if(token===undefined){
         return res.json("please enter token")
     }
    //  token = token.split(' ')[1]
 
     // verify token
     if(!token)
         {
             return res.json("Token not found")
         }
         const verifytoken = jwt.verify(token,'mykey')
         req.user = verifytoken
         next()
   } catch (error) {
    console.log(error);
   }
}

exports.isUser = (req,res,next)=>{
   try {
     console.log(req.user);
     const {roleId} = req.user;
     if(roleId===0){
         next()
     }else{
         res.json({message:"not authrized user"})
     }
   } catch (error) {
    console.log(error);
   }

}
exports.isAdmin = (req,res,next)=>{
   try {
     const {roleId}= req.user;
     if(roleId===1){
         next()
     }else{
         res.json({message:"nopt authrized user"})
     }
   } catch (error) {
    console.log(error);
   }
}
