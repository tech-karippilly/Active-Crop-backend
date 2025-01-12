import mongoose from "mongoose";
import mailSender from '../utils/mailSender.js'

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        requires:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now,
        expires:60*5
    }
},{
    timestamps:true
})



async function sendVerificationEmail(email, otp) {
    try {
      const mailResponse = await mailSender(
        email,
        "Verification Email",
        `<h1>Please confirm your OTP</h1>
         <p>Here is your OTP code: ${otp}</p>`
      );
    } catch (error) {
      console.log("Error occurred while sending email: ", error);
      throw error;
    }
  }

  otpSchema.pre("save", async function (next) {
    // Only send an email when a new document is created
    if (this.isNew) {
      await sendVerificationEmail(this.email, this.otp);
    }
    next();
  });

  export default otpSchema