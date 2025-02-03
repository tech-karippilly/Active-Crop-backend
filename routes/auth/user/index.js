import express from "express";
import { LOGOUT, USER_ATUH_GOOGLE_CALLBACK, USER_AUTH_GOOGLE, USER_LOGIN, USER_RESET_EMAIL, USER_RESET_PASSWORD, USER_SIGNUP } from "../../../constans/endpoints.js";
import Passport from "passport";
import createSatergyGoogle from "../../../utils/passport.js";
import { HTTP_SUCCESS } from "../../../constans/httpStatus.js";
import { createUser, createUserPage, forgotEmailSend, forgotEmailSendPage, forgotPasswordPage, googelAuth, googleLogin, loginPageUser, loginUser, logoutUser, resetPassword } from "../../../controllers/auth/user/index.js";

createSatergyGoogle()

const route = express.Router()

// route.get('/', getUser)

route.get(USER_LOGIN, loginPageUser)
route.post(USER_LOGIN, loginUser)

route.get(USER_AUTH_GOOGLE, Passport.authenticate('google', { scope: ['profile', 'email'] }))

route.get(USER_ATUH_GOOGLE_CALLBACK, Passport.authenticate('google', { failureRedirect: "/auth/login" }),googleLogin)

route.get('/profile', (req, res) => {
    if (req.user) {
        res.status(200).send("<a href='/api/auth/logout'>logout</a>")
    } else {
        res.redirect('/'); // Redirect if user is not logged in
    }

    
})

route.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
})

route.get(USER_SIGNUP, createUserPage)
route.post(USER_SIGNUP, createUser)

route.get(USER_RESET_EMAIL, forgotEmailSendPage)
route.post(USER_RESET_EMAIL, forgotEmailSend)

route.get(USER_RESET_PASSWORD, forgotPasswordPage)
route.post(USER_RESET_PASSWORD, resetPassword)

route.get(LOGOUT,logoutUser)

route.get('/google', googelAuth)
export default route