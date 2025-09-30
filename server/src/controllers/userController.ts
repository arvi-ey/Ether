import User from "../model/userModel.js";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../middlewares/catchAsync.js";


export const GetAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const filter = { ...req.query };
    const result = await User.find(filter)
    res.status(200).json({
        success: true,
        data: result
    })
})