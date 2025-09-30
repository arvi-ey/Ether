import { body } from 'express-validator';
import mongoose from 'mongoose';


export const CreateProjectValidator = [
    body("projectTitle")
        .notEmpty()
        .withMessage("Project title is required")
        .isString()
        .withMessage("Project title must be a string")
        .isLength({ min: 3, max: 100 })
        .withMessage("Project title must be between 3 and 100 characters"),

    body("desc")
        .notEmpty()
        .withMessage("Project description is required")
        .isString()
        .withMessage("Description must be a string")
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters"),

    body("owner")
        .notEmpty()
        .withMessage("Owner is required")
        .isString()
        .withMessage("Owner must be a valid user ID"),

    body("projectManager")
        .notEmpty()
        .withMessage("Project manager is required")
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage("Project manager must be a valid user ID"),

    body("startDate")
        .notEmpty()
        .withMessage("Start date is required")
        .isISO8601()
        .withMessage("Start date must be a valid ISO8601 date"),

    body("endDate")
        .notEmpty()
        .withMessage("End date is required")
        .isISO8601()
        .withMessage("End date must be a valid ISO8601 date"),

    body("status")
        .optional()
        .isIn(["pending", "inprogress", "completed"])
        .withMessage("Status must be either pending, in-progress, completed, or on-hold"),
];

export const UpdateProjectValidator = [
    body('projectTitle')
        .optional()
        .isString()
        .withMessage('Project title must be a string'),

    body('desc')
        .optional()
        .isString()
        .withMessage('Description must be a string'),

    body('startDate')
        .optional()
        .isISO8601()
        .withMessage('Start date must be a valid ISO8601 date'),

    body('endDate')
        .optional()
        .isISO8601()
        .withMessage('End date date must be a valid ISO8601 date'),

    body('status')
        .optional()
        .isIn(['pending', 'inprogress', 'completed'])
        .withMessage('Status must be either pending, inProgress, or completed'),
];
