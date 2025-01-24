
function loginPageUser (req,res){
    res.status(200).render('user/auth/loginPage',{ alertMessage: '', alertType: '', redirectUrl: '' })
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
        res.status(500).json({message:'Internal Server Error',status:500})
    }
}
function forgotEmailSendPage (req,res){
    res.status(200).render('user/auth/forgotEmail',{ alertMessage: '', alertType: '', redirectUrl: '' })
}
function forgotPasswordPage (req,res){
    res.status(200).render('user/auth/forogtPassword',{ alertMessage: '', alertType: '', redirectUrl: '' })
}
function OtpVerify (req,res){
    res.status(200).render('user/auth/otpVerify',{ alertMessage: '', alertType: '', redirectUrl: '' })
}
function signUp (req,res){
    res.status(200).render('user/auth/signUp',{ alertMessage: '', alertType: '', redirectUrl: '' })
}


export{loginUser,loginPageUser,forgotEmailSendPage,forgotPasswordPage,OtpVerify,signUp}