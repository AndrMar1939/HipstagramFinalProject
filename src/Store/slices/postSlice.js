import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
    post: {},
    newPost: {},
    comments: [],
    newComment: {},
    loading: false,
    errorPostText: '',
    like: null,
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
export const likePostThunk = createAsyncThunk(
    'likePost/GET',
    (postId) => {
        return api.likePostById(postId);
    }
)
export const addCommentThunk = createAsyncThunk(
    'addComment/GET',
    (data) => {
        return api.addComment(data);
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
            // like
            .addCase(likePostThunk.pending, (state) => {
                // state.loading = true;
            })
            .addCase(likePostThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.like = action.payload;
            })
            .addCase(likePostThunk.rejected, (state, action) => {
                state.loading = false;
            })
            // add comment
            // like
            .addCase(addCommentThunk.pending, (state) => {
                // state.loading = true;
            })
            .addCase(addCommentThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.comments.push(action.payload)
            })
            .addCase(addCommentThunk.rejected, (state, action) => {
                state.loading = false;
            })
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = postSlice;

export default reducer;
export const {
    switchPostLoading
} = actions;