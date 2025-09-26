
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlicer';
import projectReducer from "./slices/projectSlicer"
import taskreducer from "./slices/taskSlicer"
import teamReducer from './slices/teamsSlicer'

export const store = configureStore({
    reducer: {
        user: userReducer,
        project: projectReducer,
        task: taskreducer,
        team: teamReducer

    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
