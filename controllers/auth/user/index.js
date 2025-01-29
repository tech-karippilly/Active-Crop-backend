import { Role, Token, User } from '../../../models/index.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { sendresetMail } from '../../../utils/mailSender.js';
import { sendOtp } from '../otp/index.js';
import { isUserLoginFormValid } from '../../../utils/formValidations.js';
import { HTTP_BAD_REQUEST, HTTP_FORBIDDEN, HTTP_NOT_FOUND, HTTP_SERVER_ERROR, HTTP_SUCCESS } from '../../../constans/httpStatus.js';
import { ALERT_DANGER, ALERT_SUCCESS, ALERT_WARNING } from '../../../utils/alert.js';
import { USER_LOGIN_PAGE } from '../../../constans/page.js';
dotenv.config();

async function getUser(req, res) {
    res.status(200).send('working')
}

async function loginUser(req, res) {

    try {
        const { userName, password } = req.body

        const isFormValid = isUserLoginFormValid(userName)

        if (isFormValid) {
            const user = await User.findOne({ userName })
            if (!user) {
                return renderPage(res, HTTP_NOT_FOUND, USER_LOGIN_PAGE, 'Users Not Found', ALERT_DANGER, '')
            }
            if (!user.isVerifyed) {
                return renderPage(res, HTTP_FORBIDDEN, USER_LOGIN_PAGE, 'Users Not Verifyed', ALERT_WARNING, '')
            }
            if (user.isBlocked) {
                return renderPage(res, HTTP_FORBIDDEN, USER_LOGIN_PAGE, 'Error While Login Please contact admin', ALERT_DANGER, '')
            }
            const isPasswordValid = await user.comparePassword(password)

            if (!isPasswordValid) {
                return renderPage(res, HTTP_BAD_REQUEST, USER_LOGIN_PAGE, 'Invalid User Name or password', ALERT_WARNING, '')
            }

            const accessToken = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET_ACCESS_TOKEN,
                { expiresIn: '15m' }
            );

            const refreshToken = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET_REFRESH_TOKEN,
                { expiresIn: '1d', algorithm: 'HS256' }
            );

            req.session.accessToken = accessToken;
            req.session.refreshToken = refreshToken;
            return renderPage(res, HTTP_SUCCESS, USER_LOGIN_PAGE, 'Login sucessful', ALERT_SUCCESS, '/')
        }
        renderPage(res, HTTP_BAD_REQUEST, USER_LOGIN_PAGE, 'Invlaid User name or password', ALERT_DANGER, '')
    } catch (error) {
        renderPage(res, HTTP_SERVER_ERROR, USER_LOGIN_PAGE, 'Internal Server Error', ALERT_DANGER, '')
    }
}

const renderPage = (res, status, pageName, alertMessage, alertType, redirectUrl) => {
    res.status(status).render(pageName, { alertMessage, alertType, redirectUrl })
}

async function googleLogin(req, res) {
    try {
        const user = req.user
        const accessToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET_ACCESS_TOKEN,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET_REFRESH_TOKEN,
            { expiresIn: '1d', algorithm: 'HS256' }
        );
        
        req.session.accessToken = accessToken
        req.session.refreshToke = refreshToken

        if (req.session.accessToken) {
            return renderPage(res, HTTP_SUCCESS, USER_LOGIN_PAGE, 'Login sucessful', ALERT_SUCCESS, '/')
        }
        renderPage(res, HTTP_BAD_REQUEST, USER_LOGIN_PAGE, 'Bad Request', ALERT_SUCCESS, '')
    } catch (error) {
        renderPage(res, HTTP_SERVER_ERROR, USER_LOGIN_PAGE, 'Google Login Error', ALERT_SUCCESS, '')
    }
}

async function createUser(req, res) {
    const { firstName, lastName, email, password, userName, phone } = req.body

    try {
        const userRole = await Role.findOne({ roleName: 'User' });
        const user = {
            firstName,
            lastName,
            email,
            phone: phone,
            password,
            userName,
            isBlocked: false,
            role: userRole._id
        }


        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });

        if (existingUser) {
            res.status(200).render('user/auth/signUp', { alertMessage: '', alertType: '', redirectUrl: '' })
            return res.status(400).render('user/auth/signUp', { alertMessage: 'Username or email already exists', alertType: 'Warnning', redirectUrl: '' })
        }

        const newUser = new User(user);
        await newUser.save();
        sendOtp(req, res);
        //   res.status(201).render('user/auth/signUp',{ alertMessage: 'User created successfully', alertType: 'Success', redirectUrl: '/api/auth/login' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function forgotEmailSend(req, res) {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).render('user/auth/forgotEmail', { alertMessage: 'User not Found', alertType: 'Danger', redirectUrl: '' })
        }

        const forgotPasswrodPage = `http://localhost:3000/api/auth/reset-password?email=${email}`

        sendresetMail(email, forgotPasswrodPage)
        res.status(200).render('user/auth/forgotEmail', { alertMessage: 'Email send sucessfully', alertType: 'Success', redirectUrl: '/api/auth/login' })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", status: 500 })
    }
}

async function resetPassword(req, res) {

    try {
        const email = req.query.email;
        const { password, confirmPassword } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).render('user/auth/forogtPassword', { alertMessage: 'User not Found', alertType: 'Danger', redirectUrl: '' })
        }

        if (password === confirmPassword) {
            user.password = password
            await user.save()

            res.status(200).json({ message: 'Password Changed ', redirect: '/api/auth/login' })
        } else {
            return res.status(400).render('user/auth/forogtPassword', { alertMessage: 'Password Mismatch', alertType: 'Danger', redirectUrl: '' })
        }
    } catch (error) {
        res.status(500).render('user/auth/forogtPassword', { alertMessage: 'Internal Server Error', alertType: 'Danger', redirectUrl: '' })
    }
}

const googelAuth = async (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email`
    res.redirect(url);
}


export {
    getUser,
    loginUser,
    createUser,
    forgotEmailSend,
    resetPassword,
    googelAuth,
    googleLogin
}