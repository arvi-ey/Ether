import mongoose, { Schema, Document, Types } from 'mongoose';


export interface TaskDocument extends Document {
    name: string;
    priority: 'low' | 'medium' | 'high';
    startTime: Date;
    deadline: Date;
    status: 'pending' | 'inProgress' | 'completed';
    assigned: Types.ObjectId;
    project: Types.ObjectId;
}

const taskSchema = new Schema<TaskDocument>(
    {
        name: { type: String, required: true, trim: true },
        priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
        startTime: { type: Date, required: true },
        deadline: { type: Date, required: true },
        status: { type: String, enum: ['pending', 'inProgress', 'completed'], default: 'pending' },
        assigned: { type: Schema.Types.ObjectId, ref: 'User' },
        project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model<TaskDocument>('Task', taskSchema);

export default Task;
