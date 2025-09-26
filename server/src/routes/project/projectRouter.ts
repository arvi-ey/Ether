import express from "express";
import {
    CreateProject,
    UpdateProject,
    DeleteProject,
    GetAllProjects,
    GetSingleProject
} from "../../controllers/projectController.js";
import { CreateprojectValidator, UpdateProjectValidator } from "./projectValidator.js";
import { validateRequest } from "../../middlewares/routeValidator.js";

const Router = express.Router();


Router.post('/create', CreateprojectValidator, validateRequest, CreateProject);


Router.put('/update/:id', UpdateProjectValidator, validateRequest, UpdateProject);


Router.delete('/delete/:id', DeleteProject);

Router.get('/all', GetAllProjects);


Router.get('/:id', GetSingleProject);

export default Router;
