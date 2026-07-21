import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
userName:{
    type:String,
    required : true,
    unique:true
},
email:{
    type:String,
    trim:true,
    required:true,
    unique:true,
    index:true
},
password:{
    type:String,
    required:true

}
})

const userModel = mongoose.model('userData',userSchema)

export default userModel