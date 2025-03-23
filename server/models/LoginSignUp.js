import mongoose from "mongoose";

const LoginSignUpSchema = new mongoose.Schema(
  {
    username:String,
    email:String,
    password:String
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const LoginSignUp = mongoose.model("LoginSignUp", LoginSignUpSchema);
export default LoginSignUp;