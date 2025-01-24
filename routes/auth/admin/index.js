import express from "express";
import { adminLogin, adminLogout, createAdmin, createpage, loginPage } from "../../../controllers/auth/admin/index.js";
import { authAdminMiddleware, tokenCheckMiddleware } from "../../../middleware/tokenCheckMiddleware.js";

const route = express.Router()

route.get('/',authAdminMiddleware,loginPage)
route.post('/login',authAdminMiddleware,adminLogin)

route.get('/create-admin',createpage)
route.post('/create-admin',createAdmin)

route.get('/logout',tokenCheckMiddleware,adminLogout)

export default route