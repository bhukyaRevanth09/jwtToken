
import userModel from "../models/userModel.js";
import { RefreshToken, Token } from "../utils/tokensetter.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

 export const userSignup = async (req,res) => {
    console.log(req?.body)
    const {userName,email,password} = req?.body
    console.log(userName,email,password)
try {
    if(email){
        const searchEmail = await userModel.findOne({email:email}) 

        if(searchEmail){
            res.status(409).json({
                success:false,
                message:"email alreadyy exists"
       
            })
            console.log(searchEmail,"already exists")
             return
        }

    }else if(!userName){
        res.status(400).send("user data not reached here !")
        return
     }

      if(password){
        const salt = await bcrypt.genSalt(10);
      const genpassword = await bcrypt.hash(password,salt)
      const finalData ={
        "userName":userName,
        "email":email,
        "password":genpassword
      }
     
     const data = await userModel.create(finalData)
    
     const token = await Token(userName)
     const refreshToken = await RefreshToken(userName)
     console.log(token)
     res.status(200).send({token,refreshToken})
  }
    
} catch (error) {
     res.status(500).send('error signup controller')
     console.log(error)
}
 }

 export const userLogin = async (req,res) => {
  

 try {
      const {email,password} = req?.body
     console.log(email)
   if(email){

     const obtainedData = await userModel.findOne({email:email})
    
      if(obtainedData){
         const checkPassword = await bcrypt.compare(password,obtainedData?.password)
       if (checkPassword){
        const token = await Token(obtainedData?.userName)
     const refreshToken = await RefreshToken(obtainedData?.userName)
     console.log(token)

           res.status(200).json({
        success:true,
        message:token,refreshToken
        
    })
       }
      }
  

    }
    
 } catch (error) {
    console.log(error,"error at login form !")
 }
 }

 export const userProfile = async (req,res) => {
   try {
     console.log('profile !')
   if(req.userName.userData){
     const obtainedData = await userModel.findOne({userName:req.userName.userData})

     if(obtainedData){
        console.log(obtainedData)
        const {userName,email} = obtainedData 
        console.log('ehhh',userName)
        res.status(200).json({
            success:true,
            message:{userName,email}
        })
     }
   }
   } catch (error) {
    
   }
  
 }

 export const refreshToken = async (req,res)=>{
  console.log('reached here at refresh Token ! ')
    try {
      
      const token = req.body.refreshToken
      
    if(!token){
      res.status(401).json({
        success:false,
        message:'token not reached'
      })
    }

    const verifiedToken =  jwt.verify(token,process.env.REFRESHTOKEN)
   const  {userData} = verifiedToken
   const gettingToken = await Token(userData)

   if(!gettingToken){
    res.status(400).json({
      success:false,
      message:'token is not generated !'
    })
   }
   console.log('geetingToke sent')
   res.status(200).json({
    success:true,
    message:{'token':gettingToken}
   })
      
    } catch (error) {
      console.log("at access token generate",error)
      res.status(500).json({
        success:false,
        message:error
      })
    }
 }


