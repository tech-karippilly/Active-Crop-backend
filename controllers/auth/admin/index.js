import {Token, User} from '../../../models/index.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

async function adminLogin(req,res){   
    try{
        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message:"User Not found"})
        }

        if(!user.isVerifyed){
            return res.status(403).json({message:"User is not verified"})
        }
        const isPasswordValid = await user.comparePassword(password)

        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email or password"})
        }

        const accessToken = jwt.sign(
            { userId: user._id, email: user.email,role:user.role },
            process.env.JWT_SECRET_ACCESS_TOKEN,
            { expiresIn: '15m' }
          );

          const refreshToken = jwt.sign(
            { userId: user._id,role:user.role },
            process.env.JWT_SECRET_REFRESH_TOKEN,
            { expiresIn: '1d',algorithm: 'HS256' } 
          );

          const token = new Token({userId: user._id,access_token:accessToken,refresh_token:refreshToken})
          await token.save()

          res.status(200).json({message:"Login sucessful",access_token:accessToken,refresh_token:refreshToken})
    }catch(error){
        console.log('Error',error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

async function adminLogout(req,res){
    try{

        const access_token = req.headers['authorization'].split(' ')[1]
        const refreh_token = req.headers['refresh_token']

        const result = await Token.deleteOne({access_token:access_token})

        if(result.deletedCount === 1){
            return res.status(200).json({message:"Logout Successfully ...."})
        }else{
            return res.status(400).json({message:"Error in Token"})
        }

        
    }catch(error){
        console.log("Error in logout",error.message)
        res.status(500).json({message:"Internal server Error"})
    }

}


export {adminLogin,adminLogout}