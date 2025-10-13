import Assign from "../model/assignedModel.js";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import User from "../model/userModel.js";
import mongoose from "mongoose";


export const AssignTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const exists = await Assign.findOne({
        assignee: req.body.assignee,
        task: req.body.task
    })
    if (exists) {
        return res.status(200).json({
            success: false,
            message: `Already assigned`,
        });
    }



    const result = await Assign.create(req.body)



    if (!result) return next(new AppError("Task did not assigned,", 404))
    const user = await User.findById(result.assignee)
    res.status(200).json({
        success: true,
        message: `Task assigned to ${user?.name}`,
        data: user
    });
})


export const GetAssigneeBytask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params
    const result = await Assign.aggregate([
        {
            $match: {
                task: new mongoose.Types.ObjectId(taskId)
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "assignee",
                foreignField: "_id",
                as: "Assignee"
            }
        },
        {
            $unwind: "$Assignee"
        },
        {
            $group: {
                _id: "$task",
                assignees: { $push: "$Assignee" }
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ])
    if (result.length == 0) {
        return res.status(200).json({
            success: true,
        });
    }
    res.status(200).json({
        success: true,
        data: result[0].assignees
    });

})


export const RemoveAssignee = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { assignee, task, name } = req.body
    const result = await Assign.findOneAndDelete({
        assignee: assignee,
        task: task
    });
    if (!result) {
        return next(new AppError("No assignees found for this task", 404));
    }
    res.status(200).json({
        success: true,
        message: `${name} removed from this task`,
        data: result
    });
})