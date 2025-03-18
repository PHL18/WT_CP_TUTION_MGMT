import mongoose, { mongo } from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:100
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5,
         
    },
    city:String,
    state:String,
    country:String,
    occupation:String,
    PhoneNumber:String,
    transactions:Array,
    role:{
        type:String,
        enum:
            ["user","admin","superadmin"],
            default:"admin"
    },
     
},
{timestamps:true}
);
const User=mongoose.model("User",userSchema)
export default User