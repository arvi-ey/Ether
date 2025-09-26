import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type User from '../../src/types/usertype';

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        AddUserdata: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        ClearUser: (state) => {
            state.user = null;
        },
    },
});

export const { AddUserdata, ClearUser } = userSlice.actions;

export default userSlice.reducer;
