import express from "express";
import { GetAllUser } from "../../controllers/userController.js";
const Router = express.Router()

Router.get('/getusers', GetAllUser)

export default Router