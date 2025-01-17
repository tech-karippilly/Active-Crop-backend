import express from "express";
import { adminLogin, adminLogout, loginPage } from "../../../controllers/auth/admin/index.js";
import { tokenCheckMiddleware } from "../../../middleware/tokenCheckMiddleware.js";

const route = express.Router()


route.get('/',loginPage)
route.post('/login',adminLogin)
route.get('/logout',tokenCheckMiddleware,adminLogout)

export default route