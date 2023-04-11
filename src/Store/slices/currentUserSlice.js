import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


// init state
const initialState = {
    isAuth: localStorage.getItem('isAuth'),
    token: localStorage.getItem('token'),
    user: null,
    loading: false,
    errorLoginText: '',
    profile: {
        confirmPasswordText: '',
        confirmProfileChanges: '',
        errorPasswordText: '',
        errorProfileChanges: '',
    }
};

// thunks

export const getCurrentUserThunk = createAsyncThunk(
    'getCurrentUser/get',
    () => {
        return api.currentUser();
    }
);


export const currentUserLoginThunk = createAsyncThunk(
    'getCurrentUser/login',
    (data, { rejectWithValue }) => {
        return api.login(data).catch(er => {
            console.log(er)
            return rejectWithValue(er.response.data)
        });;
    }
);

export const updateCurrentUserThunk = createAsyncThunk(
    'updateCurrentUser/patch',
    (data) => {
        return api.updateCurrentUser(data);
    }
);

export const updatePasswordThunk = createAsyncThunk(
    'updatePassword/update',
    (data) => {
        return api.updatePassword(data);
    }
);

// local storage middleware
export const authMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case 'getCurrentUser/logout':
            localStorage.removeItem('token');
            localStorage.removeItem('isAuth');
            localStorage.removeItem('userLogin');
            break;
        case 'getCurrentUser/login/fulfilled':
            localStorage.setItem('token', action.payload.access_token);
            localStorage.setItem('isAuth', true);
            break;
        case 'getCurrentUser/get/fulfilled':
            localStorage.setItem('userLogin', action.payload.login);
            break;
        default:
            break;
    }
    return next(action);
};

// create slice


const getCurrentUser = createSlice({
    name: 'getCurrentUser',
    initialState,
    reducers: {
        cleanErrorText: (state) => {
            state.errorLoginText = '';
        },
        confirmIsAuth: (state) => {
            state.isAuth = true;
        },
        logout: (state) => {
            state.isAuth = false;
            state.token = null;
            state.user = null;
        },
        addSubscribe: (state, action) => {
            state.user.following.push(action.payload);
        },
        removeSubscribe: (state, action) => {
            state.user.following = state.user.following.filter(user => user.id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        builder
            // get user
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
            })
            .addCase(currentUserLoginThunk.rejected, (state, action) => {
                state.loading = false;
                state.isAuth = false;
                state.errorLoginText = action.payload;
            })
            // update user
            .addCase(updateCurrentUserThunk.fulfilled, (state, action) => {
                state.user = { ...state.user, ...action.payload }
                state.profile.confirmProfileChanges = "success"
            })
            .addCase(updateCurrentUserThunk.rejected, (state) => {
                state.profile.errorProfileChanges = "error, try later";
            })
            // update password updatePasswordThunk

            .addCase(updatePasswordThunk.fulfilled, (state) => {
                state.profile.confirmPasswordText = "success";
            })
            .addCase(updatePasswordThunk.rejected, (state) => {
                state.profile.errorPasswordText = "error, try later";
            })

            .addDefaultCase(() => { })
    }
})


const { actions, reducer } = getCurrentUser;

export default reducer;
export const {
    confirmIsAuth,
    logout,
    addSubscribe,
    removeSubscribe,
    cleanErrorText
} = actions;