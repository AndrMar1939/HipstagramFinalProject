import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
    users: [],
    user: null,
    loading: false,
    errorUsersText: '',
    firstContentDownload: true,
}

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
    'getByIdThunk/followUser',
    (userId) => {
        return api.getUserById(userId);
    }
)



const getUsersSlice = createSlice({
    name: 'getUsersSlice',
    initialState,
    reducers: {
        isLoadingUserById: (state)=>{
            state.loading = true;
        },
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
            .addCase(followUserThunk.pending, (state) => {
            })
            .addCase(followUserThunk.fulfilled, (state, action) => {
            })
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
    isLoadingUserById
} = actions;