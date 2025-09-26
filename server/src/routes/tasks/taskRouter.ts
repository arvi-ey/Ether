import express from "express";
import {
    CreateTask,
    UpdateTask,
    DeleteTask,
    GetAllTasks,
    GetSingleTask,
    getMyTasks
} from "../../controllers/taskController.js";


const Router = express.Router();

Router.post("/create", CreateTask);
Router.put("/update/:id", UpdateTask);
Router.delete("/delete/:id", DeleteTask);
Router.get("/all", GetAllTasks);
Router.get("/:id", GetSingleTask);
Router.get("/mytasks/:userId", getMyTasks);

export default Router;
