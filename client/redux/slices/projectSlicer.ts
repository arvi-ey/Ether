
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Project } from "../../src/types/projecttype"



interface ProjectState {
    projects: Project[];
    selectedProject?: Project;
}

const initialState: ProjectState = {
    projects: [],
    selectedProject: undefined,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        SetProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
        },
        AddProject: (state, action: PayloadAction<Project>) => {
            state.projects = [action.payload, ...state.projects]
        },
        UpdateProject: (state, action: PayloadAction<Project>) => {
            state.projects = state.projects.map((data) => data._id == action.payload._id ? action.payload : data)
        },
        DeleteProject: (state, action: PayloadAction<Project>) => {
            state.projects = state.projects.filter(data => data._id !== action.payload._id);
        },

    },
});

export const {
    SetProjects,
    AddProject,
    UpdateProject,
    DeleteProject,

} = projectSlice.actions;

export default projectSlice.reducer;
