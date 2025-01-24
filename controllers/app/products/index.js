import { Product } from "../../../models/index.js"

async function productsPage(req,res) {
    try{
        const products = await Product.find({})
        console.log(products)
        res.status(200).render('user/products/products',{data:products})
    }catch(error){

    }
}

async function productDetailsPage(req,res){
    try{
        const {id} = req.params
        const products = await Product.findById({_id:id})
        console.log(products)
        res.status(200).render('user/products/productDetails',{product:products})
    }catch(error){

    }
}

export {
    productsPage,
    productDetailsPage
}