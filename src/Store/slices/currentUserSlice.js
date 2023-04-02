import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";




const initialState = {
    isAuth: localStorage.getItem('isAuth'),
    token: localStorage.getItem('token'),
    user: null,
    loading: false,
    errorLoginText: '',
    rememberUser: localStorage.getItem('rememberUser'),
}

// thunks

export const getCurrentUserThunk = createAsyncThunk(
    'getCurrentUser/get',
    (_, {rejectWithValue})=>{     
        return api.currentUser();
    }
)


export const currentUserLoginThunk = createAsyncThunk(
    'getCurrentUser/login',
    (data, {rejectWithValue})=>{    
        return api.login(data).catch(er => {
            console.log(er)
            return rejectWithValue(er.response.data)});;
    }
)


// create slice


const getCurrentUser = createSlice ({
    name:'getCurrentUser',
    initialState,
    reducers: {
        confirmIsAuth: (state) => {
            state.isAuth = true;
        },
        logout: (state) => {
            state.isAuth = false;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('isAuth');
        }
        // rememberUser: (state) => {
        //     state.rememberUser = true;
        //     localStorage.setItem('rememberUser', true);
        // },
        // doNotRememberUser: (state) => {
        //     state.rememberUser = false;
        //     localStorage.removeItem('rememberUser');
        // },
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;               
            })
            .addCase(getCurrentUserThunk.rejected, (state) => {
                state.loading = false;
                state.isAuth = false;
            })

// login
            .addCase(currentUserLoginThunk.pending, (state) => {
                state.loading = true;
                state.errorLoginText = '';
            })
            .addCase(currentUserLoginThunk.fulfilled, (state, action) => { 
                state.loading = false;
                state.isAuth = true;
                state.errorLoginText = '';
                state.token = action.payload.access_token;
                localStorage.setItem('token', action.payload.access_token);
                localStorage.setItem('isAuth', true);
            })
            .addCase(currentUserLoginThunk.rejected, (state, action) => {                
                state.loading = false;
                state.isAuth = false;
                state.errorLoginText = action.payload;
            })


            .addDefaultCase(()=>{})
    }
})


const {actions, reducer} = getCurrentUser;

export default reducer;
export const {
    confirmIsAuth,
    logout
} = actions;