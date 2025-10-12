import express from "express"
import { AssignTask, GetAssigneeBytask, RemoveAssignee } from "../../controllers/assignController.js"
import { model } from "mongoose"

const Router = express.Router()


Router.post('/assigntask', AssignTask)
Router.get('/getassignee/:taskId', GetAssigneeBytask)
Router.post('/remove', RemoveAssignee)

export default Router