import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the user reducer

const appStore = configureStore({
    reducer : {
        user: userReducer, // Add the user reducer to the store
    }
});
export default appStore;