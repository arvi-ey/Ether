import mongoose, { Schema, Document, Types } from 'mongoose';


export interface ProjectDocument extends Document {
    projectTitle: string;
    desc: string;
    owner: string;
    projectManager: Types.ObjectId;
    startDate: string;
    endDate: string;
    status: string;
}

const projectSchema = new Schema<ProjectDocument>(
    {
        projectTitle: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },
        desc: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        owner: {
            type: String,
            ref: "User",
            required: true,
        },
        projectManager: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "inprogress", "completed"],
            default: "pending",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Project = mongoose.model<ProjectDocument>('Project', projectSchema);

export default Project;
