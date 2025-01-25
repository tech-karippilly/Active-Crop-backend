import { HTTP_BAD_REQUEST, HTTP_NOT_FOUND, HTTP_SERVER_ERROR, HTTP_SUCCESS } from "../../constans/httpStatus.js"
import { ADMIN_CATAGOERY_LIST_PAGE, ADMIN_PRODUCT_CREATE_PAGE, ADMIN_PRODUCT_EDIT_PAGE, ADMIN_PRODUCT_LIST_PAGE } from "../../constans/page.js"
import { Categoery, Product } from "../../models/index.js"
import { ALERT_DANGER, ALERT_SUCCESS, ALERT_WARNING } from "../../utils/alert.js"



export const productPage = (req, res) => {
    res.status(200).render('admin/products/index', { alertMessage: '', alertType: '', redirectUrl: '' })
}

export const updateProduct = async (req, res) => {
    try {
        const product_id = req.params.id
        const { product_name, description, price, stock_quentity, catagoery_id } = req.body

        const productDetails = await Product.findById(product_id);

        let product_images = {}
        for (var i = 0; i < req.files.length; i++) {
            product_images[i] = req.files[i].path
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
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", status: 500 })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product_id = req.params.id
        const products = await Product.deleteOne({ _id: product_id })
        if (products.deletedCount === 1) {
            return res.status(200).json({ message: "Product Deleted Successfully", status: 200 })
        }
        return res.status(400).json({ message: 'Bad Request ', status: 400 })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", status: 500 })
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        return renderPage(ADMIN_PRODUCT_LIST_PAGE, res, HTTP_SUCCESS, '', ALERT_DANGER, '', products)
    } catch (error) {
        return renderPage(ADMIN_PRODUCT_LIST_PAGE, res, HTTP_SERVER_ERROR, 'Internal Server Error', ALERT_DANGER, '', [])
    }
}

export const getProductDetails = async (req, res) => {
    try {
        const product_id = req.params.id
        const products = await Product.findById(product_id)
        res.status(200).json({ products: products, status: 200 })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", status: 500 })
    }
}

export const searchProduct = async (req, res) => {
    try {
        const { searchString } = req.query
        const products = await Product.find({ product_name: { $regex: searchString, $options: 'i' } })
        return renderPage(ADMIN_PRODUCT_LIST_PAGE, res, HTTP_SUCCESS, '', '', '', products)
    } catch (error) {
        return renderPage(ADMIN_PRODUCT_LIST_PAGE, res, HTTP_SERVER_ERROR, 'Internal Server Error', ALERT_DANGER, '', [])
    }
}

export const createProductPage = async (req, res) => {
    try {
        const catagoery = await Categoery.find({})
        renderPage(ADMIN_PRODUCT_CREATE_PAGE,res,HTTP_SUCCESS,'','','',catagoery)
    } catch (error) {
        renderPage(ADMIN_PRODUCT_CREATE_PAGE,res,HTTP_SERVER_ERROR,'Internal Server Error',ALERT_DANGER,'',catagoery)
    }
}

export const createProducts = async (req, res) => {
    try {
        const { product_name, description, price, stock_quentity, category_name } = req.body
        let product_images = {}
        for (var i = 0; i < req.files.length; i++) {
            product_images[i] = req.files[i].path
        }
        const category = await Categoery.findById({ _id: category_name });
        const catagoerys = await Categoery.find({})
        if (category) {
            const data = category.toObject()
            const newProduct = new Product({ product_name, description, price, stock_quentity: stock_quentity, catagoery_id: data._id, images: product_images })
            await newProduct.save()
           return renderPage(ADMIN_PRODUCT_CREATE_PAGE,res,HTTP_SUCCESS,'Product Created Successfully',ALERT_SUCCESS,'/api/products',catagoerys)
        }
        return renderPage(ADMIN_PRODUCT_CREATE_PAGE,res,HTTP_NOT_FOUND,'Category not found',ALERT_WARNING,'',{})
    } catch (error) {
        const catagoerys = await Categoery.find({})
        return renderPage(ADMIN_PRODUCT_CREATE_PAGE,res,HTTP_SERVER_ERROR,'Internal Server Error',ALERT_DANGER,'',catagoerys)
    }
}

export const updateProductPage = async (req, res) => {
    try {
        const { id } = req.params
        const catagoery = await Categoery.find({})
        const productDetails = await Product.findById(id);
        renderPage(ADMIN_PRODUCT_EDIT_PAGE,res,HTTP_SUCCESS,'','','',productDetails,catagoery)
    } catch (error) {
        const catagoery = await Categoery.find({})
        renderPage(ADMIN_PRODUCT_EDIT_PAGE,res,HTTP_SERVER_ERROR,'Internal Server Error','','',[],catagoery)
    }
}

const renderPage = (pageName, res, status, alertMessage, alertType, redirectUrl, data,catagories) => {
    res.status(status).render(pageName, { alertMessage, alertType, redirectUrl, data ,catagories})
}


