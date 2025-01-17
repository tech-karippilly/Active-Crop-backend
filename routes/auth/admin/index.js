import express from "express";
import { userHomePage } from "../../../controllers/user/home/index.js";

const route = express.Router()

route.get('/',userHomePage)

export default route