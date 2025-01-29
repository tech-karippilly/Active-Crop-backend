import express from "express";
import { createUser, forgotEmailSend, getUser, googelAuth, googleLogin, loginUser, resetPassword } from "../../../controllers/auth/user/index.js";
import { forgotEmailSendPage, forgotPasswordPage, loginPageUser, signUp } from "../../../controllers/user/auth/index.js";
import { USER_ATUH_GOOGLE_CALLBACK, USER_AUTH_GOOGLE } from "../../../constans/endpoints.js";
import Passport from "passport";
import createSatergyGoogle from "../../../utils/passport.js";
import { HTTP_SUCCESS } from "../../../constans/httpStatus.js";

createSatergyGoogle()

const route = express.Router()

route.get('/', getUser)

route.get('/login', loginPageUser)
route.post('/login', loginUser)

route.get(USER_AUTH_GOOGLE, Passport.authenticate('google', { scope: ['profile', 'email'] }))

route.get(USER_ATUH_GOOGLE_CALLBACK, Passport.authenticate('google', { failureRedirect: "/api/auth/login" }),googleLogin)

route.get('/profile', (req, res) => {
    console.log('Session:', req.session); 
    if (req.user) {
        console.log('User:', req.user); 
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

route.get('/signup', signUp)
route.post('/signup', createUser)

route.get('/reset-mail', forgotEmailSendPage)
route.post('/reset-mail', forgotEmailSend)

route.get('/reset-password', forgotPasswordPage)
route.post('/reset-password', resetPassword)

route.get('/google', googelAuth)
export default route