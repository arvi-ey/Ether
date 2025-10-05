import express from "express";
import {
    CreateProject,
    UpdateProject,
    DeleteProject,
    GetAllProjects,
    GetSingleProject,
    GetSingleProjectDetails
} from "../../controllers/projectController.js";
import { CreateProjectValidator, UpdateProjectValidator } from "./projectValidator.js";
import { validateRequest } from "../../middlewares/routeValidator.js";
import { GetTaskByProject } from "../../controllers/taskController.js";

const Router = express.Router();


Router.post('/create', CreateProjectValidator, validateRequest, CreateProject);


Router.put('/update/:id', UpdateProjectValidator, validateRequest, UpdateProject);


Router.delete('/delete/:id', DeleteProject);

Router.get('/getprojects', GetAllProjects);
Router.get('/project/:id/tasks', GetTaskByProject);


Router.get('/:id', GetSingleProject);
Router.get('/details/:id', GetSingleProjectDetails);

export default Router;
