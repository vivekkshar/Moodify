const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")
const blacklisted = require("../model/blacklist.model")

async function authuser(req,res,next){
     const token = req.cookies.token 

     if(!token){
        return res.status(404).json({
            message:"token not found"
        })
     }

     const istokenblacklist = await  blacklisted.findOne({
         token
     })

     if(istokenblacklist){
      return res.status(404).json({
          message:"invalid credentials"
      })
        
      
     }
     
     try{
       const  decoded = jwt.verify(
        token, 
        process.env.jwt_secert
     )
     req.user = decoded
     next()
     
     }catch(err){
        console.log("error is ", err)
     }
    }
    
module.exports = authuser;    