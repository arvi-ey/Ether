import Task from "../model/taskModel.js";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import Assign from "../model/assignedModel.js";
import mongoose from "mongoose";




export const CreateTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const task = new Task(req.body);

    await task.save()
    await task.populate("projectManager")

    res.status(200).json({
        success: true,
        message: "New task Created",
        data: task,
    });
});


export const UpdateTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true }).populate("projectManager").populate("project");;

    if (!updatedTask) return next(new AppError("Task not found", 404));

    res.status(200).json({
        success: true,
        // message: "Task updated successfully",
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


export const GetTaskByProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params

    const tasks = await Task.find({ project: id })
        .populate("assigned", "name email")
        .populate("projectManager")
        .sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        data: tasks,
    });
});


export const getMyTasks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    console.log(userId)
    const tasks = await Assign.aggregate([
        { $match: { assignee: new mongoose.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: "tasks",
                localField: "task",
                foreignField: "_id",
                as: "taskDetails"
            }
        },
        { $unwind: "$taskDetails" },
        {
            $lookup: {
                from: "users",
                localField: "taskDetails.projectManager",
                foreignField: "_id",
                as: "taskDetails.projectManager"
            }
        },
        { $unwind: "$taskDetails.projectManager" },
        {
            $lookup: {
                from: "projects",
                localField: "taskDetails.project",
                foreignField: "_id",
                as: "taskDetails.project"
            }
        },
        {
            $unwind: "$taskDetails.project"
        },
        {
            $replaceRoot: {
                newRoot: "$taskDetails"
            }
        }

    ])

    res.status(200).json({
        success: true,
        results: tasks.length,
        data: tasks,
    });
});


export const GetSingleTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const task = await Task.findById(taskId)
        .populate("project", "name desc");

    if (!task) return next(new AppError("Task not found", 404));

    res.status(200).json({
        success: true,
        data: task,
    });
});
