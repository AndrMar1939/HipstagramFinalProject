import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
    post: {},
    newPost: {},
    comments: [],
    newComment: {},
    loading: false,
    errorPostText: '',

}

// thunks
export const getPostByIdThunk = createAsyncThunk(
    'getPostById/get',
    (postId) => {
        return api.getPostById(postId);
    }
)
export const getCommentsThunk = createAsyncThunk(
    'getComments/get',
    (postId) => {
        return api.getComments(postId);
    }
)
export const createPostThunk = createAsyncThunk(
    'createPost/post',
    (data) => {
        return api.createPost(data);
    }
)

// slice

const postSlice = createSlice({
    name: 'getPostSlice',
    initialState,
    reducers: {
        switchPostLoading: (state) => {
            state.loading = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // get post
            .addCase(getPostByIdThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPostByIdThunk.fulfilled, (state, action) => {
                state.post = action.payload;
                state.loading = false;
            })
            .addCase(getPostByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.errorPostText = action.payload;
            })

            // get comments
            .addCase(getCommentsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCommentsThunk.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.loading = false;
            })
            .addCase(getCommentsThunk.rejected, (state, action) => {
                state.loading = false;
                state.errorPostText = action.payload;
            })

            // add new post
            .addCase(createPostThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPostThunk.fulfilled, (state, action) => {
                state.newPost = action.payload;
            })
            .addCase(createPostThunk.rejected, (state, action) => {
                state.loading = false;
                state.errorPostText = action.payload;
            })
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = postSlice;

export default reducer;
export const {
    switchPostLoading
} = actions;