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
        res.status(200).json({
            message: 'OTP sent successfully',
            otp,
            status:200
        });
       
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

    const { otp } = req.body
    try {

        const getOtp = await OTPModel.findOne({ otp })
        
        if(!getOtp){
            return res.status(404).json({ message: 'OTP record not found' ,status:404});
        }

        const otpExpires = 5
        const createdAt = moment(getOtp.createdAt);
        const currentTime = moment();
        const expiryTime = createdAt.add(otpExpires, 'minutes');

        if (currentTime.isAfter(expiryTime)) {
            return res.status(400).json({ message: "In valid OTP" ,status:400})
        }
        const user  = await User.findOne({email:getOtp.email})

        user.isVerifyed =true
        await  user.save()

        return res.status(200).json({ message: 'OTP verified successfully' ,status:200});
    } catch (error) {
        res.status(500).send('Internal server Error')
    }
}

export {
    sendOtp,
    resendOtp,
    verifyOtp
}