import { OTPModel, User } from "../../../models/index.js"
import otpGenerator from 'otp-generator'
import moment from "moment/moment.js"

async function sendOtp(req, res) {
    try {
        const { userName } = req.body

        const checkUser = await User.findOne({ userName })

        if (!checkUser) {
            return res.status(401).json({message:'User Not Found',status:401})
        }

    
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let result = OTPModel.findOne({ otp: otp })
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            })
            result = await OTPModel.findOne({ otp: otp });
        }
        const email = checkUser.email
        const otpPayload = { email, otp };
        const otpBody = new OTPModel(otpPayload);

        await otpBody.save();
        res.status(200).redirect('/api/otp/verifyOtp')
       
    } catch (error) {
        console.log("error", error.message)
        res.status(500).json({message:'Internal server Error',status:500})
    }
}

async function resendOtp(req, res) {
    
    try {
        
        const { userName } = req.body

        const checkUser = await User.findOne({ userName })

        if (!checkUser) {
            return res.status(401).send('User Not Found')
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let result = OTPModel.findOne({ otp: otp })
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            })
            result = await OTPModel.findOne({ otp: otp });
        }
        const email =checkUser.email
        const otpPayload = { email, otp };
        const otpBody = new OTPModel(otpPayload);

        await otpBody.save();
        res.status(200).json({
            message: 'OTP sent successfully',
            otp,
        });

    } catch (error) {
        console.log("error", error.message)
        res.status(500).send('Internal server Error')
    }
}

async function verifyOtp(req, res) {
    console.log('working')
    try {
        const { OtpVerify } = req.body
        const getOtp = await OTPModel.findOne({ otp:OtpVerify })
        
        if(!getOtp){
            return res.status(404).render('user/auth/otpVerify',{ alertMessage: 'OTP record not found', alertType: 'Danger', redirectUrl: '' })
        }

        const otpExpires = 5
        const createdAt = moment(getOtp.createdAt);
        const currentTime = moment();
        const expiryTime = createdAt.add(otpExpires, 'minutes');

        if (currentTime.isAfter(expiryTime)) {
            return res.status(400).render('user/auth/otpVerify',{ alertMessage: 'In valid OTP', alertType: 'Danger', redirectUrl: '' })
        }
        const user  = await User.findOne({email:getOtp.email})

        user.isVerifyed =true
        await  user.save()

        return res.status(200).render('user/auth/otpVerify',{ alertMessage: 'OTP verified successfully', alertType: 'success', redirectUrl: '/api/auth/login' })
    } catch (error) {
        console.log(error.message)
        res.status(500).render('user/auth/otpVerify',{ alertMessage: 'Internal Server Error', alertType: 'Danger', redirectUrl: '' })
    }
}

export {
    sendOtp,
    resendOtp,
    verifyOtp
}