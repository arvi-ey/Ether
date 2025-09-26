import Project from "../model/projectModel.js";
import { Request, Response, NextFunction } from 'express';
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import Task from "../model/taskModel.js";




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
    const projects = await Project.find()
    res.status(200).json({
        success: true,
        data: projects
    });
})


export const GetSingleProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;
    const project = await Project.findById(projectId).populate('tasks', null, Task);

    if (!project) return next(new AppError("Project not found", 404));

    res.status(200).json({
        success: true,
        data: project
    });
});