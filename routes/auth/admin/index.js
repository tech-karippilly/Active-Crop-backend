import express from "express";
import { adminLogin, adminLogout, createAdmin, createpage, loginPage } from "../../../controllers/auth/admin/index.js";
import { authAdminMiddleware, tokenCheckMiddleware } from "../../../middleware/tokenCheckMiddleware.js";
import { ADMIN_CREATE, ADMIN_LOGIN, ADMIN_LOGIN_POST, ADMIN_LOGOUT } from "../../../constans/endpoints.js";

const route = express.Router()

route.get(ADMIN_LOGIN,authAdminMiddleware,loginPage)
route.post(ADMIN_LOGIN_POST,authAdminMiddleware,adminLogin)

route.get(ADMIN_CREATE,createpage)
route.post(ADMIN_CREATE,createAdmin)

route.get(ADMIN_LOGOUT,tokenCheckMiddleware,adminLogout)

export default route