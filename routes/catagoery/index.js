import express from "express";
import { createCatagoeryPage, createCategoery, deletCategoery, getCategoery, searchCategoery, updateCatagoeryPage, updateCategoery } from "../../controllers/categoery/index.js";
import multer from 'multer'
import fs from 'fs';
const route = express.Router()

const uploadDir = './uploads/catagoery';
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
 
route.get('/',getCategoery)
route.get('/createCategoery',createCatagoeryPage)
route.post('/createCategoery',upload.single('categoery_image'),createCategoery)
route.get('/:id',updateCatagoeryPage)
route.put('/:id',upload.single('categoery_image'),updateCategoery)
route.delete('/:id',deletCategoery)
route.get('/search',searchCategoery)




export default route