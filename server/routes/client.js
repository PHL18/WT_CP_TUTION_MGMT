import express from "express"

const router = express.Router();

import {getStudents,getTeachers,getTransactions,getGeography, getPerformance, addStudent} from "../controllers/client.js"

router.get("/students",getStudents)
router.get("/teachers",getTeachers);
router.get("/transactions",getTransactions);
router.get("/geography",getGeography);
router.get("/performance",getPerformance)
router.post("/students",addStudent)

export default router
