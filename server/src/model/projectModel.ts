import mongoose, { Schema, Document, Types } from 'mongoose';
import Task from "./taskModel.js"

export interface ProjectDocument extends Document {
    name: string;
    desc: string;
    deliveryDate: Date;
    startDate: Date;
    status: 'pending' | 'inProgress' | 'completed';
    tasks: Types.ObjectId[];
}

const projectSchema = new Schema<ProjectDocument>(
    {
        name: { type: String, required: true, trim: true },
        desc: { type: String, required: true, trim: true },
        deliveryDate: { type: Date, required: true },
        startDate: { type: Date, required: true },
        status: {
            type: String,
            enum: ['pending', 'inProgress', 'completed'],
            default: 'pending'
        },
        tasks: [{ type: Schema.Types.ObjectId, ref: 'Task', default: [] }],
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model<ProjectDocument>('Project', projectSchema);

export default Project;
