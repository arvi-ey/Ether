import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type User from '../../src/types/usertype';


interface TeamState {
    team: User[] | [];
}

const initialState: TeamState = {
    team: [],
};

const teamSlicer = createSlice({
    name: 'team',
    initialState,
    reducers: {
        AddTeams: (state, action) => {
            state.team = action.payload
        }
    }
})
export const { AddTeams } = teamSlicer.actions
export default teamSlicer.reducer