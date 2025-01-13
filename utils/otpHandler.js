import otpGenerator from "otp-generator";
import { OTPModel } from "../models";


async function generateOtp(email){

    try{
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
        return true
    }catch(error){
        return false
    }



}

export {
    generateOtp
}