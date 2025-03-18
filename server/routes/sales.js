import express from "express"
import {getDaily, getSales} from "../controllers/sales.js"
import { getTransactions } from "../controllers/client.js";
const router = express.Router();
router.get("/sales",getSales)
router.get("/daily",getDaily)
router.get("/breakdown",getTransactions);
export default router
