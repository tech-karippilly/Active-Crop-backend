import { HTTP_SERVER_ERROR, HTTP_SUCCESS } from "../../../constans/httpStatus.js"
import { USER_HOME_PAGE } from "../../../constans/page.js"
import { Categoery } from "../../../models/index.js"




const renderHomepage = async (req,res) =>{

    try{
        const catagories = await Categoery.find()
        const user = req.session.userId
        return renderPage(USER_HOME_PAGE,res,HTTP_SUCCESS,user??false,catagories,)
    }catch(error){
        return renderPage(USER_HOME_PAGE,res,HTTP_SERVER_ERROR,false,[])
    }
}

const renderPage =(pageName,res,status,isLogin,catagories) =>{
    res.status(status).render(pageName,{isLogin,catagories})
}

export {
    renderHomepage
}