import express from "express";
import { GetAllUser, UpdateUser } from "../../controllers/userController.js";
import { upload } from "../../utils/multerConfig.js";
const Router = express.Router()

Router.get('/getusers', GetAllUser)
Router.patch('/updateuser/:userId', upload.single("image"), UpdateUser)

export default Router