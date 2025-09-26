import express from "express"
import { signUpValidation, signInValidation } from "./authValidator.js"
import { validateRequest } from "../../middlewares/routeValidator.js"
import { UserSignUp, UserSignIn, SignOut, CheckAuth, GetAllUser } from "../../controllers/authController.js"
const Router = express.Router()

Router.post('/signup', signUpValidation, validateRequest, UserSignUp)
Router.post('/signin', signInValidation, validateRequest, UserSignIn)
Router.get('/checkauth', CheckAuth)
Router.get('/getteams', GetAllUser)
Router.post('/signout', SignOut)


export default Router;