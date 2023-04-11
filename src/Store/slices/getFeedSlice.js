import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
    feedContent: [],
    loading: false,
    errorFeedText: '',
    firstContentDownload: true,
}


export const getFeedSliceThunk = createAsyncThunk(
    'getFeedSlice/get',
    () => {
        return api.getFeed()
    }
)





const getFeedSlice = createSlice({
    name: 'getFeedSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedSliceThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFeedSliceThunk.fulfilled, (state, action) => {
                state.feedContent = action.payload;
                state.loading = false;
                state.firstContentDownload = false;
            })
            .addCase(getFeedSliceThunk.rejected, (state, action) => {
                state.loading = false;
                state.errorFeedText = action.payload;
            })            
            .addDefaultCase(()=>{})
    }
})

const {actions, reducer} = getFeedSlice;

export default reducer;
// export const {
//     confirmIsAuth,
//     logout
// } = actions;