
import { askGroq } from "../aiGrok.js";
import userModel from "../models/userModel.js";
import { searchDocuments } from "../searchingQdrant/searchingDoc.js";
import { RefreshToken, Token } from "../utils/tokensetter.js";
import questionModel from "../models/questionModel.js";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


 export const userSignup = async (req,res) => {
   
    const {userName,email,password} = req?.body
    
try {
    if(email){
        const searchEmail = await userModel.findOne({email:email}) 

        if(searchEmail){
            res.status(409).json({
                success:false,
                message:"email alreadyy exists"
       
            })
           
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
   
     res.status(200).send({token,refreshToken})
  }
    
} catch (error) {
     res.status(500).send('error signup controller')

}
 }

 export const userLogin = async (req,res) => {
  

 try {
      const {email,password} = req?.body
 
   if(email){

     const obtainedData = await userModel.findOne({email:email})
    
      if(obtainedData){
         const checkPassword = await bcrypt.compare(password,obtainedData?.password)
       if (checkPassword){
        const token = await Token(obtainedData?.userName)
     const refreshToken = await RefreshToken(obtainedData?.userName)


           res.status(200).json({
        success:true,
        message:token,refreshToken
        
    })
       }
      }
  

    }
    
 } catch (error) {
   res.status(500).json({
    success:false,
    message:'somthing went wrong !'
   })
 }
 }

 export const userProfile = async (req,res) => {
   try {
   
   if(req.userName.userData){
     const obtainedData = await userModel.findOne({userName:req.userName.userData})

     if(obtainedData){
        
        const {userName,email} = obtainedData 
       
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

   res.status(200).json({
    success:true,
    message:{'token':gettingToken}
   })
      
    } catch (error) {
      
      res.status(500).json({
        success:false,
        message:error
      })
    }
 }

export const questionGrok = async (req, res) => {
  try {

    const askedQuestion = req.body?.searchingQuestion;


    if (
      !askedQuestion ||
      typeof askedQuestion !== "string" ||
      askedQuestion.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid question"
      });
    }


    const obtainedAnswer = await searchDocuments(
      askedQuestion
    );


   
    if (
      !obtainedAnswer ||
      !obtainedAnswer.finalContext
    ) {
      return res.status(404).json({
        success: false,
        message: "Relevant context not found"
      });
    }


   
    const response = await askGroq(
      askedQuestion,
      obtainedAnswer.finalContext
    );



    if (
      !response ||
      response.length === 0
    ) {
      return res.status(500).json({
        success: false,
        message: "AI assistant is not working properly"
      });
    }


    
    await questionModel.create({
      userId: req.user?._id,
      question: askedQuestion,
      answer: response
    });


   



    return res.status(200).json({
      success: true,
      message: response
    });

  } catch (error) {

    console.error(
      "Error at Groq controller:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to process question"
    });
  }
};
