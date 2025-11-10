import User from "../model/userModel.js";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../middlewares/catchAsync.js";
import { DeleteImage, UploadImage } from "../utils/cloudinaryUtil.js";
import { AppError } from "../utils/AppError.js";

export const GetAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const filter = { ...req.query };
    const result = await User.find(filter)
    res.status(200).json({
        success: true,
        data: result
    })
})

export const UpdateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.userId;
    let userobj = { ...req.body }
    if (req.file) {
        if (req.body.imagePublicId) {
            await DeleteImage(req.body.imagePublicId)
        }
        const imageData = await UploadImage(req.file.buffer, "user_profiles");
        if (!imageData) return next(new AppError("Image upload failed", 500));
        if (imageData?.profileImage && imageData.imagePublicId) {
            userobj.profileImage = imageData.profileImage
            userobj.imagePublicId = imageData.imagePublicId
        }
        else return next(new AppError("Image upload failed", 500));
    }



    const result = await User.findByIdAndUpdate(userId, userobj, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        data: result
    })


})