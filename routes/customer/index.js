import express from "express";
import multer from 'multer'
import fs from 'fs';
import { createCustomer, deleteCustomer, getCoustomers, getCustomerDetails, toggleUserBlockStatus, updateCustomer } from "../../controllers/customer/index.js";
const route = express.Router()

const uploadDir = './uploads/profile';
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


route.get('/',getCoustomers)
route.get('/:id',getCustomerDetails)

route.post('/createCustomer',upload.single('profile_image'),createCustomer)
route.put('/:id',upload.single('profile_image'),updateCustomer)

route.patch('/:id',toggleUserBlockStatus)

route.delete('/:id',deleteCustomer)

export default route