import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv"
import LoginSignUp from "../models/LoginSignUp.js";

const router = express.Router();
dotenv.config(); // Load environment variables


// Signup API Route
export const signup = async (req, res) => {
  try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await LoginSignUp.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already registered" });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save user in MongoDB
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

      // Compare hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

      // Generate JWT Token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ token, user });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
};
export default router;
