import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
    followers: [],
    following: [],
    loading: false,
}


export const getFollowerAndFollowingThunk = createAsyncThunk(
    'getFollowerAndFollowingSlice/get',
    (id) => {
        return api.getFollowersAndFollowings(id);
    }
)





const getFollowerAndFollowingSlice = createSlice({
    name: 'getFollowerAndFollowingSlice',
    initialState,
    reducers: {
        followPageLoading: (state) => {
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFollowerAndFollowingThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFollowerAndFollowingThunk.fulfilled, (state, action) => {
                state.followers = action.payload.followers;
                state.following = action.payload.following;
                state.loading = false;
            })
            .addCase(getFollowerAndFollowingThunk.rejected, (state) => {
                state.loading = false;
            })            
            .addDefaultCase(()=>{})
    }
})

const {actions, reducer} = getFollowerAndFollowingSlice;

export const {
    followPageLoading
} = actions;

export default reducer;
