import { Categoery, Product } from "../../models/index.js"

export const createProductPage =  async (req,res)=>{
    try{
        const catagoery = await Categoery.find({})
        res.status(200).render('admin/products/create',{ alertMessage: '', alertType: '', redirectUrl: '',categories:catagoery })
    }catch(error){
        res.status(500).render('admin/products/create',{ alertMessage: 'Internal Server Error', alertType: 'Danger', redirectUrl: '' })
    }
   
}

export const productPage =(req,res)=>{
    res.status(200).render('admin/products/index',{ alertMessage: '', alertType: '', redirectUrl: '' }) 
}
export const updateProductPage = async (req,res)=>{
    try{
        const {id} = req.params
        const catagoery = await Categoery.find({})
        const productDetails = await Product.findById(id);

        res.status(200).render('admin/products/update',{ alertMessage: '', alertType: '', redirectUrl: '',categories:catagoery,product: productDetails}) 

    }catch(error){
        const catagoery = await Categoery.find({})
        const productDetails = await Product.findById(id);
        res.status(500).render('admin/products/update',{ alertMessage: 'Internal Server Error', alertType: '', redirectUrl: '' ,categories:catagoery,product: productDetails}) 
    }
    
}

export const createProducts = async (req,res)=>{
    try{
        let product_images ={}
        for(var i=0;i<req.files.length;i++){
            product_images[i] =req.files[i].path
        }
        const {product_name,description,price,stock_quentity,category_name} = req.body
        
        const category = await Categoery.findById({ _id:category_name });
        const catagoerys= await Categoery.find({})
        if (category){
            const data = category.toObject()
            const newProduct = new Product({product_name,description,price,stock_quentity:stock_quentity,catagoery_id:data._id,images:product_images})
            await newProduct.save()
           return res.status(201).render('admin/products/create',{ alertMessage: 'Product Created Successfully', alertType: 'Success', redirectUrl: '/api/products',categories:catagoerys })
        }
        res.status(400).render('admin/products/create',{ alertMessage: 'Category not found', alertType: 'warnning', redirectUrl: '',categories:catagoerys })
        
    }catch(error){
        const catagoerys= await Categoery.find({})
        res.status(500).render('admin/products/create',{ alertMessage: 'Internal Server Error', alertType: 'danger', redirectUrl: '',categories:catagoerys })
    }
}

export const updateProduct = async (req,res)=>{
    try{
        const product_id = req.params.id
        const {product_name,description,price,stock_quentity,catagoery_id} = req.body

        const productDetails = await Product.findById(product_id);

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
        res.status(500).json({message:"Internal Server Error",status:500})
    }
}

export const getProducts = async (req,res)=>{
    try{
        const products = await Product.find({})
        res.status(200).render('admin/products/index',{ alertMessage: '', alertType: '', redirectUrl: '' ,data:products}) 
    }catch(error){
        res.status(500).render('admin/products/index',{ alertMessage: 'Internal Server Error', alertType: 'Danger', redirectUrl: '' ,data:{}})
    }
}

export const getProductDetails = async (req,res)=>{
    try{
        const product_id = req.params.id
        const products = await Product.findById(product_id)
        res.status(200).json({products:products,status:200})
    }catch(error){
        res.status(500).json({message:"Internal Server Error",status:500})
    }
}

