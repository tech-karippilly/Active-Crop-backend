import { Product } from "../../models/index.js"

export const createProductPage = (req,res)=>{
    res.status(200).render('admin/products/create',{ alertMessage: '', alertType: '', redirectUrl: '' })
}

export const productPage =(req,res)=>{
    res.status(200).render('admin/products/index',{ alertMessage: '', alertType: '', redirectUrl: '' }) 
}
export const updateProductPage =(req,res)=>{
    res.status(200).render('admin/products/update',{ alertMessage: '', alertType: '', redirectUrl: '' }) 
}

export const createProducts = async (req,res)=>{
    try{
        let product_images ={}
        for(var i=0;i<req.files.length;i++){
            product_images[i] =req.files[i].path
        }

        const {product_name,description,price,stock_quentity,catagoery_id} = req.body

        const newProduct = new Product({product_name,description,price,stock_quentity,catagoery_id,images:product_images})
        await newProduct.save()
        res.status(201).json({message:"Product Created ",status:201})
    }catch(error){
        console.log('Error in Create Products',error.message)
        res.status(500).json({message:"Internal Server Error",status:500})
    }
}

export const updateProduct = async (req,res)=>{
    try{
        const product_id = req.params.id
        const {product_name,description,price,stock_quentity,catagoery_id} = req.body

        const productDetails = await Product.findById(prduct_id);

        let product_images ={}
        for(var i=0;i<req.files.length;i++){
            product_images[i] =req.files[i].path
        }
        if (productDetails) {
            productDetails.product_name = product_name
            productDetails.description = description
            productDetails.price = price
            productDetails.stock_quentity = stock_quentity
            productDetails.catagoery_id = catagoery_id
            productDetails.images = product_images
            await productDetails.save()
           return res.status(200).json({ message: "Product Updated Successfully", status: 200 })
        }
        res.status(404).json({ message: 'Product not found', statis: 404 })
    }catch(error){
        console.log('Error in Create Products',error.message)
        res.status(500).json({message:"Internal Server Error",status:500})
    }
}

export const deleteProduct = async (req,res)=>{
    try{
        const product_id = req.params.id
        const products = await Product.deleteOne({_id:product_id})
        if(products.deletedCount ===1){
            return res.status(200).json({ message: "Product Deleted Successfully", status: 200 })
        }
        return res.status(400).json({message:'Bad Request ',status:400})
    }catch(error){
        console.log('Error in Create Products',error.message)
        res.status(500).json({message:"Internal Server Error",status:500})
    }
}

export const getProducts = async (req,res)=>{
    try{
        const products = await Product.find({})
        res.status(200).json({products:products,status:200})
    }catch(error){
        console.log('Error in Create Products',error.message)
        res.status(500).json({message:"Internal Server Error",status:500})
    }
}

export const getProductDetails = async (req,res)=>{
    try{
        const product_id = req.params.id
        const products = await Product.findById(product_id)
        res.status(200).json({products:products,status:200})
    }catch(error){
        console.log('Error in Create Products',error.message)
        res.status(500).json({message:"Internal Server Error",status:500})
    }
}

