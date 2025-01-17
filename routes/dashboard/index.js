import express from "express";
import { dasboardPage } from "../../controllers/dashboard/index.js";


const route = express.Router()


route.get('/',dasboardPage)

export default route