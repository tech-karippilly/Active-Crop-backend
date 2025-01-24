import express from "express";
import multer from 'multer'
import fs from 'fs';
import { createCustomer, createCustomerPage, deleteCustomer, getCoustomers, getCustomerDetails, searchCustomers, toggleUserBlockStatus, updateCustomer, updateCustomerPage } from "../../controllers/customer/index.js";
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
// route.get('/:id',getCustomerDetails)

route.get('/customer-create',(req,res)=>{
  console.log('working')
})

route.get('/createCustomer',createCustomerPage)
route.post('/createCustomer',upload.single('profile_image'),createCustomer)

route.get('/:id',updateCustomerPage)
route.post('/:id',upload.single('profile_image'),updateCustomer)

route.patch('/:id/:status',toggleUserBlockStatus)

route.delete('/:id',deleteCustomer)

route.get('/search',searchCustomers)

export default route