import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name : "requests",
    initialState : null,
    reducers:{
        setRequests : (state,action) =>{
            return action.payload;
        },
        removeRequest : (state,action) =>{
            // create a new array excluding the request with the given ID
            // if my req is not equal to the payload id then return the newarray
            const newArray = state.filter((req)=> req._id !== action.payload);
            return newArray;
        }
    }
})

export const {setRequests,removeRequest } = requestSlice.actions;
export default requestSlice.reducer;