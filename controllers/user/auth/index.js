
function loginPageUser (req,res){
    res.status(200).render('user/auth/loginPage',{ alertMessage: '', alertType: '', redirectUrl: '' })
}
function forgotEmailSend (req,res){
    res.status(200).render('user/auth/forgotEmail',{ alertMessage: '', alertType: '', redirectUrl: '' })
}
function forgotPassword (req,res){
    res.status(200).render('user/auth/forogtPassword',{ alertMessage: '', alertType: '', redirectUrl: '' })
}
function OtpVerify (req,res){
    res.status(200).render('user/auth/otpVerify',{ alertMessage: '', alertType: '', redirectUrl: '' })
}
function signUp (req,res){
    res.status(200).render('user/auth/signUp',{ alertMessage: '', alertType: '', redirectUrl: '' })
}


export{loginPageUser,forgotEmailSend,forgotPassword,OtpVerify,signUp}