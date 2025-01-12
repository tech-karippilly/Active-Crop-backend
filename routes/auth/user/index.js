import express from "express";
import { createUser, forgotEmailSend, getUser, loginUser, resetPassword } from "../../../controllers/auth/user/index.js";

const route = express.Router()

route.get('/',getUser)
route.post('/login',loginUser)
route.post('/signup',createUser)
route.post('/reset-mail',forgotEmailSend)
route.put('/reset-password',resetPassword)

export default route