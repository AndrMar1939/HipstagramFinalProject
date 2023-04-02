import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
    users: [],
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


const getUsersSlice = createSlice({
    name: 'getUsersSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
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
            .addDefaultCase(()=>{})
    }
})

const {actions, reducer} = getUsersSlice;

export default reducer;