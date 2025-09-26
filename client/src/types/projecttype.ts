export interface Project {
    _id?: string;
    name: string;
    desc: string;
    startDate: string;
    deliveryDate: string;
    status: 'pending' | 'inProgress' | 'completed';
    tasks?: string[];
}
