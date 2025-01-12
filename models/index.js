import mongoose from "mongoose";
import roleSchema from "../schemas/roleSchema.js";
import userSchema from "../schemas/userSchema.js";
import otpSchema from "../schemas/otpSchema.js";
import tokenSchema from "../schemas/tokenSchema.js";

const Role = mongoose.model('Role',roleSchema)
const User = mongoose.model('Users',userSchema)
const OTPModel = mongoose.model("Otp",otpSchema)
const Token =mongoose.model('Token',tokenSchema)

export {
    Role,
    User,
    OTPModel,
    Token
}