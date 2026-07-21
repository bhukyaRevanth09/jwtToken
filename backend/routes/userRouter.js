import express from  'express'
import { userLogin ,userSignup,userProfile,refreshToken} from '../controller/userController.js'
import { authLoginMiddlware } from '../middleware/loginMiddllware.js'

 const userRouter = express.Router()

userRouter.post('/singup',userSignup)
userRouter.post('/login',userLogin)
userRouter.get('/profile',authLoginMiddlware,userProfile)
userRouter.post('/refresh',refreshToken)

 export default userRouter 