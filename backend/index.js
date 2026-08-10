
import connect from "./config/database.js"
import socketHandle from "./utils/socketbackend.js"
import app from "./config/expressConfig.js"
import http from 'http'

import { askGroq } from "./aiGrok.js"

import { Server } from "socket.io"
import dotenv from 'dotenv'




dotenv.config({quiet:true})



const server = http.createServer(app)

 const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        credentials: true,
       
    }
 })

connect()



const port = process.env.PORTED_CODE
server.listen(port,()=>{
    console.log("server running on port : ", port)
})