import { HTTP_SUCCESS } from "../../../constans/httpStatus.js"
import { USER_PRODUCT_DETAILS_PAGE, USER_PRODUCT_PAGE } from "../../../constans/page.js"
import { Categoery, Product, Review } from "../../../models/index.js"

async function productsPage(req,res) {
    try{
        const {id} = req.params
        const products = await Product.find({catagoery_id:id})
        const catagories = await Categoery.find()
        res.status(HTTP_SUCCESS).render(USER_PRODUCT_PAGE,{isLogin:false,products,catagories,activeCata:id,})
    }catch(error){

    }
}

async function productDetailsPage(req,res){
    try{
        const {id,cataid} = req.params
        const products = await Product.findById({_id:id})
        const catagories = await Categoery.find()
        const reviews = await Review.find({ 'product.productId': id })
        const activeCata = await Categoery.findById(cataid)

      return  res.status(HTTP_SUCCESS).render(USER_PRODUCT_DETAILS_PAGE,{
        isLogin:false,
        products,
        catagories,
        activeCata:cataid,
        activeCataName: activeCata ? activeCata.catagoery_name : "Category",
        reviews})
    }catch(error){

    }
}

const renderPage =(res,pageName,status,isLogin,products,catagories,reviews,)=>{
    res.status(status).render(pageName,{isLogin,products,catagories,reviews})
}

export {
    productsPage,
    productDetailsPage
}