import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from "./routes/client.js"
import managementRoutes from "./routes/management.js"
import generalRoutes from "./routes/general.js"
import salesRoutes from "./routes/sales.js"
import authRoutes from "./routes/auth.js"
import User from "./models/User.js"
import Daily from './models/Daily.js'
import {dataUser,dataStudentStats, dataStudents,dataTransactions,dataOverallStatStudent,dataPerfomance,registeredUsers} from "./data/index.js"

import StudentStat from './models/StudentStat.js'
import Student from './models/Student.js'
import Transaction from './models/Transactions.js'
import OverallStat from './models/OverAllStat.js'
import {dailyStudentData} from "./data/index.js"
import Performance from './models/Performance.js'
import LoginSignUp from './models/LoginSignUp.js'

dotenv.config();
const app=express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());

app.use("/client",clientRoutes)
app.use("/general",generalRoutes)
app.use("/management",managementRoutes)
app.use("/sales",salesRoutes)
app.use("/auth",authRoutes)


// mongoose setup
const PORT=process.env.PORT || 9000
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>console.log(`server port : ${PORT}`))
    // only add data one time
    //add the product data one time only 
    // Student.insertMany(dataStudents)
    // ProductStat.insertMany(dataProductStat)
    // StudentStat.insertMany(dataStudentStats)
    // User.insertMany(dataUser)
    // Transaction.insertMany(dataTransactions)
    // OverallStat.insertMany(dataOverallStatStudent)
    // Daily.insertMany(dailyStudentData);
    // Performance.insertMany(dataPerfomance)
    // LoginSignUp.insertMany(registeredUsers)



}).catch((error)=>console.log(`${error} did not connect`))