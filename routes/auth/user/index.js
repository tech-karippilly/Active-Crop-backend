import express from "express";
import { createUser, getUser, resetPassword } from "../../../controllers/auth/user/index.js";

const route = express.Router()

route.get('/',getUser)
route.post('/signup',createUser)
route.post('/reset-password',resetPassword)

export default route