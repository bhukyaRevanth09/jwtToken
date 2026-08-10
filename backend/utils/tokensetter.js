import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({quiet:true})


export const Token = async (data) => {
   
    try {
        const userData = data 

    const tokenSender = jwt.sign({userData},process.env.TOKENSET,{expiresIn:'20m'})
     if(tokenSender){
        return tokenSender
     }
    } catch (error) {
        console.log(error,"token expiry")
        return 'error at token generate'
        
    }
    
}
export const RefreshToken = async (data) => {
    try {
        const userData = data
        console.log('refreshtokenData :: ',userData)
        const refreshTokenSender = jwt.sign({userData},process.env.REFRESHTOKEN,{expiresIn:"7d"})
        if(refreshTokenSender){
            return refreshTokenSender
        }
    } catch (error) {
        console.log('refreshtoken',error)
        return 'error at  RefreshToken generate'
    }
}


