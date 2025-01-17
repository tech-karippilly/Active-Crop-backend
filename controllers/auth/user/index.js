import {Role, Token, User} from '../../../models/index.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { sendresetMail } from '../../../utils/mailSender.js';
dotenv.config();

async function getUser(req,res){
    res.status(200).send('working')
}

async function loginUser(req,res){

    try{
        const {userName,password} = req.body

        const user = await User.findOne({userName})

        if(!user){
            return res.status(404).json({message:"Users Not Found",status:404})
        }

        if(!user.isVerifyed){
            return res.status(403).json({message:"Users Not Verifyed",status:403})
        }

        const isPasswordValid = await user.comparePassword(password)

        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email or password",status:400})
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

          res.status(200).json({message:"Login sucessful",access_token:accessToken,refresh_token:refreshToken,status:200})
    }catch(error){
        console.log('Error on user Login',error.message)
        res.status(500).json({message:'Internal Server Error',status:500})
    }
}

async function createUser(req,res){
    const {firstName,lastName,email,password,userName,phone} = req.body

    try{
        const userRole = await Role.findOne({ roleName:'User' });
        const user ={
            firstName,
            lastName,
            email,
            phone,
            password,
            userName,
            isBlocked:false,
            role:userRole._id
        }
         
        
        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
          }

          const newUser = new User(user);
          await newUser.save();
          res.status(201).json({ message: 'User created successfully', user: newUser });
    }catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function forgotEmailSend(req,res){
    try{
        const {email} = req.body

        const user  = await User.findOne({email})

        if(!user){
            return res.status(404).json({ message: 'User not Found' ,status:404});
        }

        const forgotPasswrodPage = `http://localhost:3000/page/user/forogotPasswordPage?email=${email}`

        sendresetMail(email,forgotPasswrodPage)
        res.status(200).json({message:"Email send sucessfully",status:200})
    }catch(error){
        console.log('Error Email send',error.message)
        res.status(500).json({message:"Internal Server Error", status:500})
    }
}

async function resetPassword(req,res){

    try{

        const {email,password,confirmPassword} =req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({ message: 'User not Found' ,status:404});
        }

        if (password === confirmPassword){
            user.password = password
            await user.save()

            res.status(200).json({message:'Passwrod Update ... ',status:200})
        }else{
            return res.status(400).json({message:"Password Mismatch",status:400})
        }
    }catch(error){
        console.log('Error Reset Password',error.message)
        res.status(500).json({message:"Internal Server Error", status:500})
    }
}

 const googelAuth  = async (req,res)=>{
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email`
    res.redirect(url);
}


export {
    getUser,
    loginUser,
    createUser,
    forgotEmailSend,
    resetPassword,
    googelAuth
}