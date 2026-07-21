
import connect from "./config/database.js"
import userRouter from "./routes/userRouter.js"

import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config({quiet:true})
connect()
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api',userRouter)



const port = process.env.PORTED_CODE
app.listen(port,()=>{
    console.log("server running on port : ", port)
})