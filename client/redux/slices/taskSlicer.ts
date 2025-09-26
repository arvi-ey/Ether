import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task } from "../../src/types/tasktypes";
interface TaskState {
    tasks: Task[];
    selectedTask?: Task;
}

const initialState: TaskState = {
    tasks: [],
    selectedTask: undefined,
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
            console.log(state.tasks)
        },
    },
});

export const {
    SetTasks,
    AddTask,
    UpdateTask,
    DeleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;
