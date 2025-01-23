import { Role, Token, User } from '../../../models/index.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { ADMIN_DASHBOARD, ADMIN_LOGIN } from '../../../constans/index.js';
dotenv.config();


function loginPage(req, res) {
    res.status(200).render('admin/auth/loginPage', { alertMessage: '', alertType: '', redirectUrl: '' })
}

function createpage(req, res) {
    res.status(200).render('admin/auth/signupPage', { alertMessage: '', alertType: '', redirectUrl: '' })
}

async function createAdmin(req, res) {
    
    try {
        const { firstName, lastName, userEmail, password, userName,phone, confirmPassword } = req.body
       
        const userRole = await Role.findOne({ roleName: 'SuperAdmin' });
        console.log('userRole',userRole)

        const existingUser = await User.findOne({ $or: [{ userName }, { email:userEmail }] });
        
        if (existingUser) {
            return res.render('admin/auth/signupPage', { alertMessage: 'Username or email already exists', alertType: 'danger', redirectUrl: '' })
        }
        console.log('existingUser',existingUser)
        const user = {
            firstName,
            lastName,
            email:userEmail,
            password,
            userName,
            phone,
            isBlocked: false,
            role: userRole._id
        }

        const newUser = new User(user);
        await newUser.save();
        res.status(201).render('admin/auth/signupPage', { alertMessage: 'User Admin Created', alertType: 'success', redirectUrl: {ADMIN_LOGIN} })

    } catch (error) {
        console.log(error.message)
        res.status(500).render('admin/auth/signupPage', { alertMessage: 'error', alertType: 'danger', redirectUrl: '' })
    }
}

async function adminLogin(req, res) {
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).render('admin/auth/loginPage', { alertMessage: 'User not Found', alertType: 'danger', redirectUrl: '' })
        }

        if (!user.isVerifyed) {
            return res.status(403).render('admin/auth/loginPage', { alertMessage: 'User is not verifyed', alertType: 'warnning', redirectUrl: '' })
        }
        const isPasswordValid = await user.comparePassword(password)

        if (!isPasswordValid) {
            return res.status(400).render('admin/auth/loginPage', { alertMessage: 'Invalid Password or UserName', alertType: 'danger', redirectUrl: '' })
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

        const token = new Token({ userId: user._id, access_token: accessToken, refresh_token: refreshToken })
        await token.save()
        req.session.accessToken = accessToken;
        req.session.refreshToken = refreshToken;
        res.status(200).render('admin/auth/loginPage', { alertMessage: 'Login Successfull', alertType: 'sucess', redirectUrl: ADMIN_DASHBOARD })
    } catch (error) {
        console.log('Error', error.message)
        res.status(500).render('admin/auth/loginPage', { alertMessage: 'Internal sever error', alertType: 'danger', redirectUrl: '' })
    }
}

async function adminLogout(req, res) {
    try {

        const access_token = req.headers['authorization'].split(' ')[1]
        const refreh_token = req.headers['refresh_token']

        const result = await Token.deleteOne({ access_token: access_token })

        if (result.deletedCount === 1) {
            return res.status(200).json({ message: "Logout Successfully ...." })
        } else {
            return res.status(400).json({ message: "Error in Token" })
        }


    } catch (error) {
        console.log("Error in logout", error.message)
        res.status(500).json({ message: "Internal server Error" })
    }

}


export { createpage, createAdmin, loginPage, adminLogin, adminLogout }