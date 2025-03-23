import express from "express"

const router = express.Router();
import { login } from "../controllers/auth.js";
import { signup } from "../controllers/auth.js";

router.post("/login",login)
router.post("/signup",signup)



export default router
