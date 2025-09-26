import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import mongoose from 'mongoose';

export const globalError = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = { ...err };
    error.message = err.message;

    if (err instanceof mongoose.Error.CastError) {
        error = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue);
        error = new AppError(`${field} already exists`, 400);
    }

    if (err instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(err.errors).map(el => el.message);
        error = new AppError(`Validation error: ${messages.join('. ')}`, 400);
    }

    if (err instanceof AppError) {
        error = err;
    }
    console.log(error.message)

    res.status(error.statusCode || 500).json({
        status: error.status || 'error',
        message: error.message || 'Internal Server Error',
    });
};
