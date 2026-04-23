// ============================================================
// AfriHire — Applications Slice
// Application tracking with status workflow
// ============================================================

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { applyToJobApi, updateApplicationStatusApi } from '../utils/api';
import { saveToStorage, loadFromStorage } from '../utils/helpers';

const STORAGE_KEY = 'afrihire_applications';

// Load persisted applications
const persistedApps = loadFromStorage(STORAGE_KEY, []);

const initialState = {
  applications: persistedApps,
  loading: false,
  error: null,
};

// Async thunks
export const applyToJob = createAsyncThunk(
  'applications/apply',
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await applyToJobApi(applicationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const response = await updateApplicationStatusApi(applicationId, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    clearApplicationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Apply to job
      .addCase(applyToJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
        saveToStorage(STORAGE_KEY, state.applications);
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update status
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { id, status } = action.payload;
        const app = state.applications.find((a) => a.id === id);
        if (app) {
          app.status = status;
          app.updatedAt = new Date().toISOString();
        }
        saveToStorage(STORAGE_KEY, state.applications);
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearApplicationError } = applicationsSlice.actions;

// Selectors
export const selectAllApplications = (state) => state.applications.applications;
export const selectApplicationsLoading = (state) => state.applications.loading;
export const selectApplicationsError = (state) => state.applications.error;

export const selectApplicationsByCandidate = (candidateId) => (state) =>
  state.applications.applications.filter((app) => app.candidateId === candidateId);

export const selectApplicationsByJob = (jobId) => (state) =>
  state.applications.applications.filter((app) => app.jobId === jobId);

export const selectApplicationsByStatus = (status) => (state) =>
  state.applications.applications.filter((app) => app.status === status);

export const selectHasApplied = (candidateId, jobId) => (state) =>
  state.applications.applications.some(
    (app) => app.candidateId === candidateId && app.jobId === jobId
  );

export const selectApplicationCountByJob = (jobId) => (state) =>
  state.applications.applications.filter((app) => app.jobId === jobId).length;

export default applicationsSlice.reducer;
