import { body } from 'express-validator';


export const CreateprojectValidator = [
    body('name')
        .notEmpty()
        .withMessage('Project name is required')
        .isString()
        .withMessage('Project name must be a string'),

    body('desc')
        .notEmpty()
        .withMessage('Project description is required')
        .isString()
        .withMessage('Description must be a string'),

    body('startDate')
        .notEmpty()
        .withMessage('Start date is required')
        .isISO8601()
        .withMessage('Start date must be a valid ISO8601 date'),

    body('deliveryDate')
        .notEmpty()
        .withMessage('Delivery date is required')
        .isISO8601()
        .withMessage('Delivery date must be a valid ISO8601 date'),

    body('status')
        .optional()
        .isIn(['pending', 'inProgress', 'completed'])
        .withMessage('Status must be either pending, inProgress, or completed'),
];


export const UpdateProjectValidator = [
    body('name')
        .optional()
        .isString()
        .withMessage('Project name must be a string'),

    body('desc')
        .optional()
        .isString()
        .withMessage('Description must be a string'),

    body('startDate')
        .optional()
        .isISO8601()
        .withMessage('Start date must be a valid ISO8601 date'),

    body('deliveryDate')
        .optional()
        .isISO8601()
        .withMessage('Delivery date must be a valid ISO8601 date'),

    body('status')
        .optional()
        .isIn(['pending', 'inProgress', 'completed'])
        .withMessage('Status must be either pending, inProgress, or completed'),
];
