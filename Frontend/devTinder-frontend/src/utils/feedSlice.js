import {createSlice} from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
        setFeed: (state, action) =>{
            return action.payload;
        },
        //remove user from the feed after sending request
        removeUserFromFeed: (state, action) => {
            const newfeed = state.filter((user) => user._id !== action.payload);
            return newfeed;
        }
    },
   
})

export const {setFeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;