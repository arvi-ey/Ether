
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface TaskDocument extends Document {
    name: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    startTime: string;
    deadline: string;
    status: 'pending' | 'inProgress' | 'completed';
    project: Types.ObjectId;
    assigned: Types.ObjectId[];
    createdBy: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    attachments?: string[];
    comments?: Types.ObjectId[];
    projectManager?: Types.ObjectId
}

const taskSchema = new Schema<TaskDocument>(
    {
        name: {
            type: String,
            required: [true, "Task name is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true
        },

        priority: {
            required: true,
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },

        startTime: {
            type: String,
        },
        deadline: { type: String, required: true },

        status: {
            type: String,
            enum: ['pending', 'inProgress', 'completed'],
            default: 'pending',
        },

        project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },

        assigned:
            [{ type: Schema.Types.ObjectId, ref: 'User' }],
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        attachments: [{ type: String }],
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        projectManager: {
            type: Schema.Types.ObjectId, ref: "User"
        }
    },
    {
        timestamps: true,
    }
);



taskSchema.pre('save', function (next) {
    if (this.deadline < this.startTime) {
        return next(new Error('Deadline must be after start time.'));
    }
    next();
});

const Task = mongoose.model<TaskDocument>('Task', taskSchema);

export default Task;






[
    {
        "name": "Design Login Page",
        "description": "Create responsive login UI with form validation",
        "priority": "high",
        "startTime": "2025-10-01T08:00:00.000Z",
        "deadline": "2025-10-07T18:00:00.000Z",
        "status": "inProgress",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b01f88d6a95f65dd4e11"],
        "createdBy": "68d6b01f88d6a95f65dd4e21",
        "updatedBy": "68d6b01f88d6a95f65dd4e31",
        "attachments": [],
        "comments": ["68d6b01f88d6a95f65dd4f11"],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Setup Database Schema",
        "description": "Define MongoDB schemas for tasks and projects",
        "priority": "medium",
        "startTime": "2025-10-02T10:00:00.000Z",
        "deadline": "2025-10-09T16:00:00.000Z",
        "status": "pending",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b02f88d6a95f65dd4e12"],
        "createdBy": "68d6b02f88d6a95f65dd4e22",
        "updatedBy": "68d6b02f88d6a95f65dd4e32",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Implement Auth Middleware",
        "description": "Add JWT authentication and authorization",
        "priority": "high",
        "startTime": "2025-10-03T09:30:00.000Z",
        "deadline": "2025-10-12T18:00:00.000Z",
        "status": "pending",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b03f88d6a95f65dd4e13"],
        "createdBy": "68d6b03f88d6a95f65dd4e23",
        "attachments": [],
        "comments": ["68d6b03f88d6a95f65dd4f12"],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Integrate Stripe Payments",
        "description": "Setup payment gateway for subscriptions",
        "priority": "high",
        "startTime": "2025-10-04T11:00:00.000Z",
        "deadline": "2025-10-14T17:00:00.000Z",
        "status": "inProgress",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b04f88d6a95f65dd4e14"],
        "createdBy": "68d6b04f88d6a95f65dd4e24",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Create Project Dashboard",
        "description": "Develop dashboard UI with task overview",
        "priority": "medium",
        "startTime": "2025-10-05T08:00:00.000Z",
        "deadline": "2025-10-15T19:00:00.000Z",
        "status": "pending",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b05f88d6a95f65dd4e15"],
        "createdBy": "68d6b05f88d6a95f65dd4e25",
        "attachments": [],
        "comments": ["68d6b05f88d6a95f65dd4f13"],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Write Unit Tests",
        "description": "Add Jest tests for API routes",
        "priority": "low",
        "startTime": "2025-10-06T09:00:00.000Z",
        "deadline": "2025-10-20T17:00:00.000Z",
        "status": "pending",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b06f88d6a95f65dd4e16"],
        "createdBy": "68d6b06f88d6a95f65dd4e26",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Setup CI/CD Pipeline",
        "description": "Configure GitHub Actions for deployment",
        "priority": "high",
        "startTime": "2025-10-07T10:30:00.000Z",
        "deadline": "2025-10-18T20:00:00.000Z",
        "status": "inProgress",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b07f88d6a95f65dd4e17"],
        "createdBy": "68d6b07f88d6a95f65dd4e27",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Implement Notifications",
        "description": "Add email and push notifications for tasks",
        "priority": "medium",
        "startTime": "2025-10-08T08:00:00.000Z",
        "deadline": "2025-10-19T18:00:00.000Z",
        "status": "pending",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b08f88d6a95f65dd4e18"],
        "createdBy": "68d6b08f88d6a95f65dd4e28",
        "attachments": [],
        "comments": ["68d6b08f88d6a95f65dd4f14"],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Optimize Queries",
        "description": "Add indexes and optimize MongoDB queries",
        "priority": "high",
        "startTime": "2025-10-09T09:00:00.000Z",
        "deadline": "2025-10-21T16:00:00.000Z",
        "status": "inProgress",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b09f88d6a95f65dd4e19"],
        "createdBy": "68d6b09f88d6a95f65dd4e29",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Build Task Filters",
        "description": "Implement filters for tasks by status & priority",
        "priority": "medium",
        "startTime": "2025-10-10T07:00:00.000Z",
        "deadline": "2025-10-22T19:00:00.000Z",
        "status": "pending",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b10f88d6a95f65dd4e20"],
        "createdBy": "68d6b10f88d6a95f65dd4e30",
        "attachments": [],
        "comments": ["68d6b10f88d6a95f65dd4f15"],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Add Role-Based Access",
        "description": "Setup user roles and permissions",
        "priority": "high",
        "startTime": "2025-10-11T08:00:00.000Z",
        "deadline": "2025-10-23T17:00:00.000Z",
        "status": "pending",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b11f88d6a95f65dd4e21"],
        "createdBy": "68d6b11f88d6a95f65dd4e31",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Create Reports Module",
        "description": "Generate PDF/CSV reports for projects",
        "priority": "low",
        "startTime": "2025-10-12T09:00:00.000Z",
        "deadline": "2025-10-26T16:00:00.000Z",
        "status": "inProgress",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b12f88d6a95f65dd4e22"],
        "createdBy": "68d6b12f88d6a95f65dd4e32",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Enhance Search Feature",
        "description": "Improve task search with fuzzy matching",
        "priority": "medium",
        "startTime": "2025-10-13T10:00:00.000Z",
        "deadline": "2025-10-24T18:00:00.000Z",
        "status": "pending",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b13f88d6a95f65dd4e23"],
        "createdBy": "68d6b13f88d6a95f65dd4e33",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Implement Dark Mode",
        "description": "Add dark/light theme toggle",
        "priority": "low",
        "startTime": "2025-10-14T08:00:00.000Z",
        "deadline": "2025-10-27T19:00:00.000Z",
        "status": "pending",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b14f88d6a95f65dd4e24"],
        "createdBy": "68d6b14f88d6a95f65dd4e34",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Add Calendar Integration",
        "description": "Sync tasks with Google Calendar",
        "priority": "medium",
        "startTime": "2025-10-15T09:00:00.000Z",
        "deadline": "2025-10-28T20:00:00.000Z",
        "status": "inProgress",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b15f88d6a95f65dd4e25"],
        "createdBy": "68d6b15f88d6a95f65dd4e35",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Fix Bug in Task Update",
        "description": "Resolve issue with task status not saving",
        "priority": "high",
        "startTime": "2025-10-16T08:30:00.000Z",
        "deadline": "2025-10-18T16:00:00.000Z",
        "status": "completed",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b16f88d6a95f65dd4e26"],
        "createdBy": "68d6b16f88d6a95f65dd4e36",
        "attachments": [],
        "comments": ["68d6b16f88d6a95f65dd4f16"],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Improve API Docs",
        "description": "Update Swagger documentation",
        "priority": "low",
        "startTime": "2025-10-17T09:00:00.000Z",
        "deadline": "2025-10-25T19:00:00.000Z",
        "status": "pending",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b17f88d6a95f65dd4e27"],
        "createdBy": "68d6b17f88d6a95f65dd4e37",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Add File Upload",
        "description": "Implement Cloudinary integration for tasks",
        "priority": "medium",
        "startTime": "2025-10-18T07:30:00.000Z",
        "deadline": "2025-10-30T18:00:00.000Z",
        "status": "inProgress",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b18f88d6a95f65dd4e28"],
        "createdBy": "68d6b18f88d6a95f65dd4e38",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Performance Testing",
        "description": "Run load tests with JMeter",
        "priority": "high",
        "startTime": "2025-10-19T10:00:00.000Z",
        "deadline": "2025-10-31T20:00:00.000Z",
        "status": "pending",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b19f88d6a95f65dd4e29"],
        "createdBy": "68d6b19f88d6a95f65dd4e39",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    },
    {
        "name": "Implement Activity Logs",
        "description": "Track user actions in the system",
        "priority": "medium",
        "startTime": "2025-10-20T08:30:00.000Z",
        "deadline": "2025-11-02T19:00:00.000Z",
        "status": "pending",
        "project": "68dc244a07fc30c459af47bb",
        "assigned": ["68d6b20f88d6a95f65dd4e30"],
        "createdBy": "68d6b20f88d6a95f65dd4e40",
        "attachments": [],
        "comments": [],
        "projectManager": "68d6a92c88d6a95f65dd4d41"
    }
]

