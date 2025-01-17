import express from "express";
import cors from 'cors'
import ConnectDb from "./config/db.js";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

import roleAuth from './routes/roles/index.js'
import adiminAuthRoute from './routes/auth/admin/index.js'
import userRoute from './routes/auth/user/index.js'
import otpRoute from './routes/auth/otp/index.js'
import tokenRoute from './routes/auth/token/index.js'
import categoeryRoute from './routes/catagoery/index.js'
import productRoute from './routes/products/index.js'

const app = express()

ConnectDb()



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extends:true}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use('/api/admin/role',roleAuth)
app.use('/api/admin/auth',adiminAuthRoute)
app.use('/api/auth',userRoute)
app.use('/api/otp/',otpRoute)
app.use('/api/auth/token',tokenRoute)

app.use('/api/categoery',categoeryRoute)
app.use('/api/products',productRoute)
 


export default app