import { configureStore } from "@reduxjs/toolkit";    
import getCurrentUser from "./slices/currentUserSlice";
import getFeedSlice from "./slices/getFeedSlice";
import getUsersSlice from "./slices/getUsersSlice";

const store = configureStore({
    reducer: { 
        getCurrentUser, 
        getFeedSlice, 
        getUsersSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: true
});


export default store;