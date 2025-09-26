import mongoose, { Document, Model, Schema } from 'mongoose';


export interface UserType extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: 'developer' | 'admin' | 'manager';
    createdAt: Date;
    updatedAt: Date;
}


const userSchema: Schema<UserType> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: 2,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
        },

        role: {
            type: String,
            enum: ['manager', 'admin', 'developer'],
            default: 'developer',
        },
    },
    {
        timestamps: true,
    }
);


const User: Model<UserType> = mongoose.model<UserType>('User', userSchema);

export default User;
