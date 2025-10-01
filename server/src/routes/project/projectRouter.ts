import express from "express";
import {
    CreateProject,
    UpdateProject,
    DeleteProject,
    GetAllProjects,
    GetSingleProject
} from "../../controllers/projectController.js";
import { CreateProjectValidator, UpdateProjectValidator } from "./projectValidator.js";
import { validateRequest } from "../../middlewares/routeValidator.js";

const Router = express.Router();


Router.post('/create', CreateProjectValidator, validateRequest, CreateProject);


Router.put('/update/:id', UpdateProjectValidator, validateRequest, UpdateProject);


Router.delete('/delete/:id', DeleteProject);

Router.get('/getprojects', GetAllProjects);


Router.get('/:id', GetSingleProject);

export default Router;
