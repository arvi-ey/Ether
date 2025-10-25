export interface Task {
    name?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    startTime?: Date;
    deadline?: Date;
    status?: 'pending' | 'inProgress' | 'completed';
    project?: string;
    createdBy?: string;
    assigned?: string;
    updatedBy?: string;
    attachments?: string[];
    comments?: string[];
    projectManager?: string;
    _id?: string
}
