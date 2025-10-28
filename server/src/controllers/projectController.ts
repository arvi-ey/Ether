import Project from "../model/projectModel.js";
import { Request, Response, NextFunction } from 'express';
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import Task from "../model/taskModel.js";
import mongoose from "mongoose";




export const CreateProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const project = await Project.create(req.body)
    if (!project) return next(new AppError("Failed to create project", 404))
    res.status(200).json({
        success: true,
        message: "New Project created",
        data: project
    })
})

export const UpdateProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;
    const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true, runValidators: true });

    if (!updatedProject) return next(new AppError("Project not found", 404));

    res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: updatedProject
    });
});


export const DeleteProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) return next(new AppError("Project not found", 404));

    res.status(200).json({
        success: true,
        message: "Project deleted successfully",
        data: deletedProject
    });
});


export const GetAllProjects = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    let filter = { ...req.query }

    let projects;
    if (filter.status === 'all') {
        projects = await Project.find().sort({ createdAt: 1 });
    } else {
        projects = await Project.find(filter).sort({ createdAt: 1 });
    }
    res.status(200).json({
        success: true,
        data: projects
    });
})


export const GetSingleProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;
    const project = await Project.findById(projectId)

    if (!project) return next(new AppError("Project not found", 404));

    res.status(200).json({
        success: true,
        data: project
    });
});
export const GetSingleProjectDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;
    const project = await Project.aggregate(
        [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(projectId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "projectManager",
                    foreignField: "_id",
                    as: "manager"
                }
            },
            { $unwind: "$manager" }
        ]
    )

    if (!project) return next(new AppError("Project not found", 404));

    res.status(200).json({
        success: true,
        data: project
    });
});