import Task from "../model/taskModel.js";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import User from "../model/userModel.js";
import Project from "../model/projectModel.js";
import { Types } from "mongoose";



export const CreateTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { project, ...taskData } = req.body;
    const projectDoc = await Project.findById(project);
    if (!projectDoc) return next(new AppError("Project not found", 404));

    const task = await Task.create({ ...taskData, project });
    projectDoc.tasks.push(task._id as Types.ObjectId);
    await projectDoc.save();
    res.status(200).json({
        success: true,
        message: "Task added successfully",
        data: task,
    });
});


export const UpdateTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });

    if (!updatedTask) return next(new AppError("Task not found", 404));

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: updatedTask,
    });
});


export const DeleteTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) return next(new AppError("Task not found", 404));

    res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: deletedTask,
    });
});


export const GetAllTasks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await Task.find().populate("assigned", "name email").populate("project", "name");
    res.status(200).json({
        success: true,
        data: tasks,
    });
});


export const getMyTasks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    console.log(userId)
    const tasks = await Task.find({ assigned: userId })
        .populate("project", "name")
        .populate("assigned", "name email");

    res.status(200).json({
        success: true,
        results: tasks.length,
        data: tasks,
    });
});


export const GetSingleTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const task = await Task.findById(taskId)
        .populate("assigned", "name email")
        .populate("project", "name desc");

    if (!task) return next(new AppError("Task not found", 404));

    res.status(200).json({
        success: true,
        data: task,
    });
});
