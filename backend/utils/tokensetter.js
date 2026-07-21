import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({quiet:true})

console.log(process.env.TOKENSET)
export const Token = async (data) => {
    console.log(data)
    try {
        const userData = data

    const tokenSender = jwt.sign({userData},process.env.TOKENSET,{expiresIn:'1m'})
     if(tokenSender){
        return tokenSender
     }
    } catch (error) {
        console.log(error,"token expiry")
        
    }
    
}
export const RefreshToken = async (data) => {
    try {
        const userData = data
        console.log('refreshtokenData :: ',userData)
        const refreshTokenSender = jwt.sign({userData},process.env.REFRESHTOKEN,{expiresIn:"2m"})
        if(refreshTokenSender){
            return refreshTokenSender
        }
    } catch (error) {
        console.log('refreshtoken',error)
    }
}


