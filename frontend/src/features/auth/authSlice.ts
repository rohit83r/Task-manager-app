import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface User {
    id: string;
    email: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
}

const storedUser = localStorage.getItem('user');
const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    user: parsedUser,
    loading: false,
    error: null,
};

export const login = createAsyncThunk<
    { token: string; user: User },
    { email: string; password: string },
    { rejectValue: string }
>('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await api.post('/auth/login', credentials);
        const { token, user } = response.data;


        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return { token, user };
    } catch (err: any) {
        const message = err.response?.data?.message || 'Login failed';
        return thunkAPI.rejectWithValue(message);
    }
});

export const register = createAsyncThunk<
    { token: string; user: User },
    { email: string; password: string },
    { rejectValue: string }
>('auth/register', async (credentials, thunkAPI) => {
    try {
        const response = await api.post('/auth/register', credentials);
        const { token, user } = response.data;

        // Persist to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return { token, user };
    } catch (err: any) {
        const message = err.response?.data?.message || 'Registration failed';
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
            })

            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Registration failed';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
