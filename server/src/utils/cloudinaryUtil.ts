import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { AppError } from "./AppError.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const DeleteImage = async (image_public_url: string) => {

    try {
        if (!image_public_url) return false
        const result = await cloudinary.uploader.destroy(image_public_url);
        if (result.result !== "ok") return true
    }
    catch (error) {
        console.log(error)
    }
};


export const UploadImage = async (fileBuffer: Buffer, folder?: string) => {
    try {
        if (!fileBuffer) return null;

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder, resource_type: "image" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(fileBuffer);
        });
        return {
            profileImage: (result as any).secure_url,
            imagePublicId: (result as any).public_id,
        };
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};

export default cloudinary;
