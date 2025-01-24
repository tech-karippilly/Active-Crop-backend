import express from 'express'
import { resendOtp, sendOtp, verifyOtp } from '../../../controllers/auth/otp/index.js'
import { OtpVerify } from '../../../controllers/user/auth/index.js'

const route = express.Router()

route.post('/sendOtp',sendOtp)
route.get('/verifyOtp',OtpVerify)
route.post('/verifyOtp',verifyOtp)
route.post('/resentOtp',resendOtp)

export default route