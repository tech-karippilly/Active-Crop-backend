import express from "express";
import { createUser, forgotEmailSend, getUser, googelAuth, loginUser, resetPassword } from "../../../controllers/auth/user/index.js";
import { forgotEmailSendPage, forgotPasswordPage, loginPageUser, signUp } from "../../../controllers/user/auth/index.js";

const route = express.Router()

route.get('/',getUser)
route.get('/login',loginPageUser)
route.post('/login',loginUser)

route.get('/signup',signUp)
route.post('/signup',createUser)

route.get('/reset-mail',forgotEmailSendPage)
route.post('/reset-mail',forgotEmailSend)

route.get('/reset-password',forgotPasswordPage)
route.post('/reset-password',resetPassword)

route.get('/google',googelAuth)
export default route