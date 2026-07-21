import mongoose from "mongoose";


  

const connect = async()=>{

try {

     const check =  await mongoose.connect(process.env.MONGODB_URI)
     console.log('mongodb connected !')
   
} catch (error) {
    console.log(error)
}  
}
export default connect
 


