import express from "express";
import cors from 'cors'
import ConnectDb from "./config/db.js";
 
const app = express()


ConnectDb()
app.use(cors())


export default app