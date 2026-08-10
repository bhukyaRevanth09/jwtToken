import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config({quiet:true})

export const authLoginMiddlware = async (req,res,next) => {
 try {
    const authHeader = req?.headers.authorization
 
  if(!authHeader || !authHeader.startsWith('Bearer ')){
      return res.status(401).json({
        success:false,
        message:'token is not provided'
     })
  }

  const token = authHeader.split(' ')[1]
  if (!token){
    return res.status(401).json({
        success:false,
        message:'token is not valid'
    })
  }

  const secretKey= process.env.TOKENSET

    if(!secretKey){
       return res.status(401).json({
        success:false,
        message:'secretkey is missing !'
       })
    }

let decoded;
 try {
    
     decoded = jwt.verify(token,secretKey)

    
 } catch (jwtError) {
    if(jwtError.name === "TokenExpiredError"){
        return res.status(401).json({
            success:false,
            code:'TOKEN_EXPIRED'
        })
    }
 }



    req.userName = decoded
    return next()
   
 } catch (error) {
    return res.status(401).json({
       success:false,
    message:'internal server error'
    })
 }
  
}
