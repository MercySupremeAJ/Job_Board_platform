// ============================================================
// AfriHire — Auth Slice
// Role-based authentication state management
// ============================================================

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi } from '../utils/api';
import { saveToStorage, loadFromStorage, clearFromStorage } from '../utils/helpers';

const STORAGE_KEY = 'afrihire_auth';

// Load persisted auth state
const persistedAuth = loadFromStorage(STORAGE_KEY, null);

const initialState = {
  user: persistedAuth?.user || null,
  role: persistedAuth?.role || null, // 'candidate' | 'company'
  isAuthenticated: !!persistedAuth?.user,
  loading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Invalid email or password');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerApi(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
      clearFromStorage(STORAGE_KEY);
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      saveToStorage(STORAGE_KEY, { user: state.user, role: state.role });
    },
    toggleSavedJob: (state, action) => {
      if (state.role !== 'candidate' || !state.user) return;
      const jobId = action.payload;
      const savedJobs = state.user.savedJobs || [];
      if (savedJobs.includes(jobId)) {
        state.user.savedJobs = savedJobs.filter((id) => id !== jobId);
      } else {
        state.user.savedJobs = [...savedJobs, jobId];
      }
      saveToStorage(STORAGE_KEY, { user: state.user, role: state.role });
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role;
        state.isAuthenticated = true;
        saveToStorage(STORAGE_KEY, { user: action.payload, role: action.payload.role });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role;
        state.isAuthenticated = true;
        saveToStorage(STORAGE_KEY, { user: action.payload, role: action.payload.role });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { logout, clearAuthError, updateUserProfile, toggleSavedJob } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsCandidate = (state) => state.auth.role === 'candidate';
export const selectIsCompany = (state) => state.auth.role === 'company';
const EMPTY_SAVED_JOBS = [];
export const selectSavedJobs = (state) => state.auth.user?.savedJobs ?? EMPTY_SAVED_JOBS;

export default authSlice.reducer;
