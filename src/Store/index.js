import { configureStore } from "@reduxjs/toolkit";    
import getCurrentUser from "./slices/currentUserSlice";
import getFeedSlice from "./slices/getFeedSlice";
import getUsersSlice from "./slices/getUsersSlice";
import getFollowerAndFollowingSlice from "./slices/followerAndFollowingSlice";
import postSlice from "./slices/postSlice";

const store = configureStore({
    reducer: { 
        getCurrentUser, 
        getFeedSlice, 
        getUsersSlice,
        getFollowerAndFollowingSlice,
        postSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: true
});


export default store;