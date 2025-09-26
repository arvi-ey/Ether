import User from "../model/userModel.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import { Request, Response, NextFunction } from 'express';
import { HashedPassword, CheckPassWord, GenerateToken } from "../utils/authUtil.js";
import { AppError } from "../utils/AppError.js";
import jwt from 'jsonwebtoken';

export const UserSignUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const hashedpass = await HashedPassword(req.body.password)
    console.log(hashedpass)
    const payload = { ...req.body, password: hashedpass }
    const user = await User.create(payload)
    if (!user) {
        return next(new AppError("Failed to create user", 400))
    }
    res.status(200).json({
        success: true,
        message: "User created successfully",
        data: user
    })
})



export const UserSignIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new AppError('Invalid email', 401));
    }
    const isValidPass = await CheckPassWord(req.body.password, user.password)
    if (!isValidPass) {
        return next(new AppError('Invalid password', 401));
    }
    const token = await GenerateToken({
        id: user._id,
        role: user.role
    })
    res.cookie('accesstoken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 1,
    });
    res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: user
    })
})


export const SignOut = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("accesstoken", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });
    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })

})

interface JwtPayload {
    id: string;
    iat: number;
    exp: number;
}



export const CheckAuth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accesstoken;
    if (!token) return next(new AppError('Unauthorized', 404))
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!decoded?.id) return next(new AppError('Invalid token', 401));
    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError('User not found', 404))
    res.status(200).json({
        success: true,
        data: user
    })
})


export const GetAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await User.find()
    if (!result) return next(new AppError('Error while fetching teams', 404))
    res.status(200).json({
        success: true,
        data: result
    })
})