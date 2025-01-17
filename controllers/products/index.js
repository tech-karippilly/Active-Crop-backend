import { Product } from "../../models/index.js"

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

export const updateProduct = (req,res)=>{
    try{

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
