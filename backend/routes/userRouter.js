import express from  'express'
import { userLogin ,
         userSignup,
         userProfile,
         refreshToken,
         questionGrok

} from '../controller/userController.js'
import {getRagStats} from '../controller/RagDetails.js'
import { authLoginMiddlware } from '../middleware/loginMiddllware.js'

 const userRouter = express.Router()

userRouter.post('/singup',userSignup)
userRouter.post('/login',userLogin)
userRouter.get('/profile',authLoginMiddlware,userProfile)
userRouter.post('/refresh',refreshToken)
userRouter.post('/ask',questionGrok)
userRouter.get('/ragDetails',authLoginMiddlware,getRagStats)

 export default userRouter 