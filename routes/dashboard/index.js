import express from "express";
import { dasboardPage } from "../../controllers/dashboard/index.js";
import { authAdminDashboardMiddleware } from "../../middleware/tokenCheckMiddleware.js";


const route = express.Router()


route.get('/',authAdminDashboardMiddleware,dasboardPage)

export default route