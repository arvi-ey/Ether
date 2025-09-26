export interface Task {
    _id?: string;
    name?: string;
    priority?: 'low' | 'medium' | 'high';
    startTime?: string;
    deadline?: string;
    status?: 'pending' | 'inProgress' | 'completed';
    assigned?: string[];
    project: string;
}
