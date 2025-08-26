import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name : "requests",
    initialState : null,
    reducers:{
        setRequests : (state,action) =>{
            return action.payload;
        },
        removeRequests : (state,action) => null,
    }
})

export const {setRequests,removeRequests} = requestSlice.actions;
export default requestSlice.reducer;