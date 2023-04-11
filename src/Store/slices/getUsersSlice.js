import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
    users: [],
    user: '',
    loading: false,
    errorUsersText: '',
    firstContentDownload: true,
    searchString: '',
}

// thunks

export const getUsersThunk = createAsyncThunk(
    'getUsersSlice/get',
    () => {
        return api.getUsers();
    }
)

export const followUserThunk = createAsyncThunk(
    'getUsersSlice/followUser',
    (userId) => {
        return api.followUser(userId);
    }
)
export const getByIdThunk = createAsyncThunk(
    'getByIdThunk/getUser',
    (userId) => {
        return api.getUserById(userId);
    }
)

// slice

const getUsersSlice = createSlice({
    name: 'getUsersSlice',
    initialState,
    reducers: {
        isLoadingUserById: (state)=>{
            state.loading = true;
        },
        subscribeForUser: (state)=>{
            ++state.user.followersCount;
        },
        unsubscribeForUser: (state)=>{
            --state.user.followersCount;
        },
        toggleIsFollow: (state, action)=>{
            state.users.forEach(user=> {                
                if (user._id===action.payload){
                    user.isFollow = !user.isFollow;
                }});
        },
        searchUserByLogin: (state, action)=>{
            state.searchString = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        // get
            .addCase(getUsersThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
                state.firstContentDownload = false;
            })
            .addCase(getUsersThunk.rejected, (state, action) => {
                state.loading = false;
                state.errorFeedText = action.payload;
            })  
            // follow

            .addCase(followUserThunk.rejected, (state, action) => {
                state.errorUsersText = action.payload;
            })  
            // get by id
            .addCase(getByIdThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getByIdThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })


            // default          
            .addDefaultCase(()=>{})
    }
})

const {actions, reducer} = getUsersSlice;


export default reducer;

export const {
    isLoadingUserById,
    subscribeForUser,
    unsubscribeForUser,
    toggleIsFollow,
    searchUserByLogin
} = actions;