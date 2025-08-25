import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the user reducer
import feedReducer from './feedSlice'; // Import the feed reducer
import connectionReducer from './connectionSlice'; // Import the connection reducer


const appStore = configureStore({
    reducer : {
        user: userReducer, // Add the user reducer to the store
        feed: feedReducer, // Add the feed reducer to the store
        connections: connectionReducer // Add the connection reducer to the store
    }
});
export default appStore;