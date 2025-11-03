import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task } from "../../src/types/tasktypes";
interface TaskState {
    tasks: Task[];
    selectedTask?: Task;
    assignedusers: any;
    count: number
}

const initialState: TaskState = {
    tasks: [],
    selectedTask: undefined,
    assignedusers: [],
    count: 0
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        SetTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        AddTask: (state, action: PayloadAction<Task>) => {
            state.tasks = [action.payload, ...state.tasks];
        },
        UpdateTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.map((task) =>
                task._id === action.payload._id ? action.payload : task
            );
        },
        DeleteTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.filter((task) => task._id !== action.payload._id);
        },

        GetAssignedUser: (state, action) => {
            state.assignedusers = action.payload.users
            state.count = action.payload.total
        },
        AddAssignedUser: (state, action) => {
            let exists = false
            if (state.assignedusers.length > 0) {
                exists = state.assignedusers.some((data: any) => data._id == action.payload._id)
            }
            if (exists) return
            state.assignedusers = [action.payload, ...state.assignedusers]
            state.count = state.count + 1
        },
        RemoveAssignUser: (state, action) => {
            state.assignedusers = state.assignedusers.filter((data: any) => data._id !== action.payload)
            state.count = state.count - 1
        }
    },
});

export const {
    SetTasks,
    AddTask,
    UpdateTask,
    DeleteTask,
    GetAssignedUser,
    AddAssignedUser,
    RemoveAssignUser

} = taskSlice.actions;

export default taskSlice.reducer;
