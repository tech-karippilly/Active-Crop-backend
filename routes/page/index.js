import express from "express";
import { loginPage } from "../../controllers/auth/admin/index.js";
import { dasboardPage } from "../../controllers/dashboard/index.js";
import { forgotEmailSend, forgotPassword, loginPageUser, OtpVerify, signUp } from "../../controllers/user/auth/index.js";
import { catagoeryPage, createCatagoeryPage, updateCatagoeryPage } from "../../controllers/categoery/index.js";
import { createProductPage, productPage, updateProductPage } from "../../controllers/products/index.js";
import { createCustomerPage, customerPage, updateCustomerPage } from "../../controllers/customer/index.js";
import { userHomePage } from "../../controllers/user/home/index.js";

const route = express.Router()



route.get('/',loginPage)
route.get('/dashboard',dasboardPage)

route.get('/admin/catagoery',catagoeryPage)
route.get('/admin/createCategoery',createCatagoeryPage)
route.get('/admin/updateCategoery',updateCatagoeryPage)

route.get('/admin/product',productPage)
route.get('/admin/createProduct',createProductPage)
route.get('/admin/updateProduct',updateProductPage)

route.get('/admin/customer',customerPage)
route.get('/admin/createCustomer',createCustomerPage)
route.get('/admin/updateCustomer',updateCustomerPage)

route.get('/user/loginPage',loginPageUser)
route.get('/user/signupPage',signUp)
route.get('/user/forogotEmailSendPage',forgotEmailSend)
route.get('/user/forogotPasswordPage',forgotPassword)
route.get('/user/otpVerifyPage',OtpVerify)

route.get('/home',userHomePage)

export default route