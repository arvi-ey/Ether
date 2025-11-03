import express from "express"
import { AssignTask, GetAssigneeBytask, RemoveAssignee, GetAllAssignedUser } from "../../controllers/assignController.js"
import { model } from "mongoose"

const Router = express.Router()


Router.post('/assigntask', AssignTask)
Router.get('/getassignee/:taskId', GetAssigneeBytask)
Router.post('/remove', RemoveAssignee)
Router.get('/getusersproject/:projectId', GetAllAssignedUser)

export default Router