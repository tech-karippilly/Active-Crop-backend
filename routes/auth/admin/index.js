import express from "express";
import { adminLogin, adminLogout } from "../../../controllers/auth/admin/index.js";

const route = express.Router()

route.get('/',(req,res)=>{
    res.status(200).send('workingroute ')
})


route.post('/login',adminLogin)
route.get('/logout',adminLogout)

export default route