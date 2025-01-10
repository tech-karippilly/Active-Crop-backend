import express from "express";
import cors from 'cors'
import ConnectDb from "./config/db.js";
import dotenv from 'dotenv';

import roleAuth from './routes/roles/index.js'
import adiminAuthRoute from './routes/auth/admin/index.js'

dotenv.config();

const app = express()

ConnectDb()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extends:true}))



app.use('/api/admin/role',roleAuth)
app.use('/api/admin/auth',adiminAuthRoute)
// app.use('/api/auth')



export default app