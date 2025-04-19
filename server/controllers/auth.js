import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv"
import LoginSignUp from "../models/LoginSignUp.js";

const router = express.Router();
dotenv.config(); 


export const signup = async (req, res) => {
  try {
      const { username, email, password } = req.body;

    
      const existingUser = await LoginSignUp.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already registered" });

    
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      
      const newUser = new LoginSignUp({ username, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await LoginSignUp.findOne({ email });

      if (!user) return res.status(401).json({ message: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ token, user });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
};
export default router;
