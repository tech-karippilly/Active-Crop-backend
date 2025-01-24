import express from "express";

import { tokenCheckMiddleware } from "../../../middleware/tokenCheckMiddleware.js";
import { productDetailsPage, productsPage } from "../../../controllers/app/products/index.js";

const route = express.Router()

route.get('/',productsPage)
route.get('/:id',productDetailsPage)

export default route