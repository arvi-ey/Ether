import mongoose, { Schema, Document, Types } from "mongoose";

export interface TaskAssign extends Document {
    assignee: Types.ObjectId,
    task: Types.ObjectId,
    delegator: Types.ObjectId,
    project: Types.ObjectId
}

const assignSchema = new Schema<TaskAssign>(
    {
        assignee: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please assign a team member"],
        },
        task: {
            type: Schema.Types.ObjectId,
            ref: "Task",
            required: [true, "Task  is missing"]
        },
        delegator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Task Delegator is missing"]
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: [true, "Project  is missing"]
        }

    },
    {
        timestamps: true,
    }
)

const Assign = mongoose.model<TaskAssign>('Assign', assignSchema)

export default Assign