import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

// ──────── Async Thunks ────────

export const fetchTasks = createAsyncThunk<Task[]>(
    'tasks/fetchTasks',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/tasks');
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue('Failed to load tasks');
        }
    }
);

export const createTask = createAsyncThunk<Task, Omit<Task, 'id'>>(
    'tasks/createTask',
    async (task, thunkAPI) => {
        try {
            const res = await api.post('/tasks', task);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue('Failed to create task');
        }
    }
);

export const updateTask = createAsyncThunk<Task, Task>(
    'tasks/updateTask',
    async (task, thunkAPI) => {
        try {
            const res = await api.put(`/tasks/${task.id}`, task);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue('Failed to update task');
        }
    }
);

export const deleteTask = createAsyncThunk<string, string>(
    'tasks/deleteTask',
    async (id, thunkAPI) => {
        try {
            await api.delete(`/tasks/${id}`);
            return id;
        } catch (err: any) {
            return thunkAPI.rejectWithValue('Failed to delete task');
        }
    }
);

// ──────── Slice ────────

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.loading = false;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })

            // Create
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })

            // Update
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const updatedTask = action.payload;
                const index = state.tasks.findIndex(task => task.id === updatedTask.id);
                if (index !== -1) {
                    state.tasks[index] = updatedTask;
                }
            })

            // Delete
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((t) => t.id !== action.payload);
            });
    },
});

export default taskSlice.reducer;
