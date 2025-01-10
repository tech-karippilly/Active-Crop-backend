import mongoose from "mongoose";
import roleSchema from "../schemas/roleSchema.js";
import userSchema from "../schemas/userSchema.js";

const Role = mongoose.model('Role',roleSchema)
const User = mongoose.model('Users',userSchema)


export {
    Role,
    User
}