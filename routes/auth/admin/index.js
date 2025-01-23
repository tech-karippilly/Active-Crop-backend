import express from "express";
import { adminLogin, adminLogout, createAdmin, createpage, loginPage } from "../../../controllers/auth/admin/index.js";
import { tokenCheckMiddleware } from "../../../middleware/tokenCheckMiddleware.js";

const route = express.Router()

route.get('/create-admin',createpage)
route.post('/create-admin',createAdmin)
route.get('/login',loginPage)
route.post('/login',adminLogin)
route.get('/logout',tokenCheckMiddleware,adminLogout)

export default route