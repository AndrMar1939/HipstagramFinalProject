import { configureStore } from "@reduxjs/toolkit";    
import getCurrentUser from "./slices/currentUserSlice";
import getFeedSlice from "./slices/getFeedSlice";
import getUsersSlice from "./slices/getUsersSlice";
import getFollowerAndFollowingSlice from "./slices/followerAndFollowingSlice";
import postSlice from "./slices/postSlice";
import { authMiddleware } from "./slices/currentUserSlice";

const store = configureStore({
    reducer: { 
        getCurrentUser, 
        getFeedSlice, 
        getUsersSlice,
        getFollowerAndFollowingSlice,
        postSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authMiddleware),
    devTools: true
});


export default store;

