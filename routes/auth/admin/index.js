import express from "express";
import { adminLogin, adminLogout } from "../../../controllers/auth/admin/index.js";

const route = express.Router()


route.post('/login',adminLogin)
route.get('/logout',adminLogout)

export default route