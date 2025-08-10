import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name : "user",
    initialState: null,
    reducers : {
        addUser : (state, action) => {
            return action.payload; // This will update the state with the user data
        },
        removeUser : (state, action) => {
            return null; // This will reset the state to null when the user logs out
        },
    }
})

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;