import Assign from "../model/assignedModel.js";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import User from "../model/userModel.js";
import mongoose from "mongoose";


export const AssignTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const exists = await Assign.findOne({
        assignee: req.body.assignee,
        task: req.body.task,
        roleForTask: req.body.roleForTask
    })
    if (exists) {
        return res.status(200).json({
            success: false,
            message: `Already assigned`,
        });
    }

    const result = await Assign.create(req.body)

    // console.log(result)

    if (!result) return next(new AppError("Task did not assigned,", 404))
    let user: any = await User.findById(result.assignee)
    let responseObj = {}
    if (user) {
        const userObj = user.toObject()
        responseObj = { ...userObj, roleForTask: result.roleForTask }

    }
    // console.log(responseObj)
    res.status(200).json({
        success: true,
        message: `Task assigned to ${user?.name}`,
        data: responseObj
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
                assignees: {
                    $push: {
                        _id: "$Assignee._id",
                        name: "$Assignee.name",
                        email: "$Assignee.email",
                        role: "$Assignee.role",
                        profileImage: "$Assignee.profileImage",
                        assignee: "$Assignee.assignee",
                        roleForTask: "$roleForTask",
                    },
                }
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
    const { assignee, task, name, roleForTask } = req.body
    const result = await Assign.findOneAndDelete({
        assignee: assignee,
        task: task,
        roleForTask
    });
    console.log(result)
    if (!result) {
        return next(new AppError("No assignees found for this task", 404));
    }
    res.status(200).json({
        success: true,
        message: `${name} removed from this task`,
        data: result
    });
})



export const GetAllAssignedUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { projectId } = req.params

    const result = await Assign.aggregate([
        {
            $match: {
                project: new mongoose.Types.ObjectId(projectId),
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'assignee',
                foreignField: '_id',
                as: 'userDetails',
            },
        },
        { $unwind: '$userDetails' },
        {
            $group: {
                _id: '$assignee',
                user: { $first: '$userDetails' },
                roleForTask: { $first: '$roleForTask' },
            },
        },
        {
            $facet: {
                totalCount: [{ $count: "count" }],
                data: [
                    { $limit: 6 },
                    {
                        $project: {
                            _id: "$user._id",
                            name: "$user.name",
                            email: "$user.email",
                            role: "$user.role",
                            profileImage: "$user.profileImage",
                            roleForTask: "$roleForTask",
                        },
                    },
                ],
            },
        },
        {
            $project: {
                total: { $arrayElemAt: ["$totalCount.count", 0] },
                users: "$data",
            },
        },
    ])
    const final = result[0] || { total: 0, users: [] };

    res.status(200).json({
        success: true,
        total: final.total || 0,
        count: final.users.length,
        users: final.users,
    });

})