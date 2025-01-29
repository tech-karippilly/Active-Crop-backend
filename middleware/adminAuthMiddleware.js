import { Role, Token, User } from '../models/index.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { ADMIN_LOGIN_PAGE } from '../constans/page.js' 
import { HTTP_UNAUTHORIZED, HTTP_FORBIDDEN, HTTP_SERVER_ERROR } from '../constans/httpStatus.js';
import { ALERT_DANGER } from '../utils/alert.js';
dotenv.config();

export const adminAuthMiddleware = async (req, res, next) => {
    try{
        const access_token = req.session.accessToken

        const token = await  Token.findOne({access_token})

        if (!token){
            return res.status(HTTP_UNAUTHORIZED).send('Access Denied')
        }
        
        const jwtDecode = jwt.verify(token,process_params.env.JWT_SECRET_ACCESS_TOKEN)
        const userId = jwtDecode.userId
    }
    catch(error){

    }
};

export const preventLoggedInAccess = (req,res,next)=>{
    if (req.session && req.session.accessToken) {
        return res.redirect(ADMIN_DASHBOARD);
    }
    next();
}

function renderResponse(pageName,res, status, alertMessage, alertType, redirectUrl) {
    res.status(status).render(pageName, { alertMessage, alertType, redirectUrl });
}
