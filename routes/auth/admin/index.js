import express from "express";
import { adminLogin, adminLogout } from "../../../controllers/auth/admin/index.js";
import { tokenCheckMiddleware } from "../../../middleware/tokenCheckMiddleware.js";

const route = express.Router()


route.post('/login',adminLogin)
route.get('/logout',tokenCheckMiddleware,adminLogout)

export default route