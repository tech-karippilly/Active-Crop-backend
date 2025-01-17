import express from "express";
import { createCategoery, deletCategoery, getCategoery, updateCategoery } from "../../controllers/categoery/index.js";
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
route.post('/createCategoery',upload.single('categoery_image'),createCategoery)
route.put('/:id',upload.single('categoery_image'),updateCategoery)
route.delete('/:id',deletCategoery)




export default route