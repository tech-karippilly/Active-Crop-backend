import express from "express";
import { loginPage } from "../../controllers/auth/admin/index.js";
import { dasboardPage } from "../../controllers/dashboard/index.js";
import { forgotEmailSend, forgotPassword, loginPageUser, OtpVerify, signUp } from "../../controllers/user/auth/index.js";
import { catagoeryPage, createCatagoeryPage, updateCatagoeryPage } from "../../controllers/categoery/index.js";

const route = express.Router()



route.get('/',loginPage)
route.get('/',dasboardPage)

route.get('/admin/catagoery',catagoeryPage)
route.get('/admin/createCategoery',createCatagoeryPage)
route.get('/admin/updateCategoery',updateCatagoeryPage)




route.get('/user/loginPage',loginPageUser)
route.get('/user/signupPage',signUp)
route.get('/user/forogotEmailSendPage',forgotEmailSend)
route.get('/user/forogotPasswordPage',forgotPassword)
route.get('/user/otpVerifyPage',OtpVerify)


export default route