import { Role, Token, User } from '../models/index.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { ADMIN_LOGIN_PAGE } from '../constans/page.js' 
import { HTTP_UNAUTHORIZED, HTTP_FORBIDDEN, HTTP_SERVER_ERROR } from '../constans/httpStatus.js';
import { ALERT_DANGER } from '../utils/alert.js';
dotenv.config();

export const adminAuthMiddleware = async (req, res, next) => {
    try {

        const token = req.session.accessToken   
        
        if (!token) {
            return renderResponse(ADMIN_LOGIN_PAGE,res,HTTP_UNAUTHORIZED,'Access denied. No token provided.',ALERT_DANGER,'')
        }

        // Verify the access token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);
        
        const userId = decoded.userId; 

        const user = await User.findById({_id:userId});

        const userRole = await Role.findById(user.role)

        if (!user || userRole.roleName === 'User' ) {
            return renderResponse(ADMIN_LOGIN_PAGE,res,HTTP_FORBIDDEN,'Access denied. Admin rights required.',ALERT_DANGER,'')
          
        }
        next();
    } catch (error) {
        renderResponse(ADMIN_LOGIN_PAGE,res,HTTP_SERVER_ERROR,'Internal server error.',ALERT_DANGER,'')
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
