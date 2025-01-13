import express from "express";
import cors from 'cors'
import ConnectDb from "./config/db.js";
import dotenv from 'dotenv';

import roleAuth from './routes/roles/index.js'
import adiminAuthRoute from './routes/auth/admin/index.js'
import userRoute from './routes/auth/user/index.js'
import otpRoute from './routes/auth/otp/index.js'
import tokenRoute from './routes/auth/token/index.js'

dotenv.config();

const app = express()

ConnectDb()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extends:true}))



app.use('/api/admin/role',roleAuth)
app.use('/api/admin/auth',adiminAuthRoute)
app.use('/api/auth',userRoute)
app.use('/api/otp/',otpRoute)
app.use('/api/auth/token',tokenRoute)
 


export default app