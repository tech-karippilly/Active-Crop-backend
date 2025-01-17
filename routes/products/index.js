import express from "express";
import { createProducts, deleteProduct, getProductDetails, getProducts, updateProduct } from "../../controllers/products/index.js";
import multer from "multer";
import fs from 'fs';

const route = express.Router()

const uploadDir = './uploads/products';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Creates the directory and its parents if needed
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
 const upload = multer({ storage: storage })

route.post('/createProducts',upload.array('product_image',4),createProducts)
route.put('/:id',upload.array('product_image',4),updateProduct)
route.delete('/:id',deleteProduct)
route.get('/',getProducts)
route.get('/:id',getProductDetails)

export default route