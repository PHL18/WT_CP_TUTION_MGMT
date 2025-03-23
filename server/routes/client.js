import express from "express"

const router = express.Router();

import {getStudents,getTeachers,getTransactions,getGeography, getPerformance} from "../controllers/client.js"

router.get("/students",getStudents)
router.get("/teachers",getTeachers);
router.get("/transactions",getTransactions);
router.get("/geography",getGeography);
router.get("/performance",getPerformance)

export default router
