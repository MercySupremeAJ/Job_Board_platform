// ============================================================
// AfriHire — Profile Slice
// Candidate and company profile management
// ============================================================

import { createSlice } from '@reduxjs/toolkit';
import { saveToStorage, loadFromStorage } from '../utils/helpers';

const STORAGE_KEY = 'afrihire_profiles';

const persistedProfiles = loadFromStorage(STORAGE_KEY, {});

const initialState = {
  profiles: persistedProfiles,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      const { userId, profileData } = action.payload;
      state.profiles[userId] = {
        ...state.profiles[userId],
        ...profileData,
        updatedAt: new Date().toISOString(),
      };
      saveToStorage(STORAGE_KEY, state.profiles);
    },
    setCandidateProfile: (state, action) => {
      const { userId, skills, experience, bio, links, title, location } = action.payload;
      state.profiles[userId] = {
        ...state.profiles[userId],
        skills: skills || [],
        experience: experience || [],
        bio: bio || '',
        links: links || {},
        title: title || '',
        location: location || '',
        updatedAt: new Date().toISOString(),
      };
      saveToStorage(STORAGE_KEY, state.profiles);
    },
    setCompanyProfile: (state, action) => {
      const { userId, companyName, description, website, industry, location, size, founded } = action.payload;
      state.profiles[userId] = {
        ...state.profiles[userId],
        companyName: companyName || '',
        description: description || '',
        website: website || '',
        industry: industry || '',
        location: location || '',
        size: size || '',
        founded: founded || '',
        updatedAt: new Date().toISOString(),
      };
      saveToStorage(STORAGE_KEY, state.profiles);
    },
    addExperience: (state, action) => {
      const { userId, experience } = action.payload;
      if (!state.profiles[userId]) {
        state.profiles[userId] = { experience: [] };
      }
      state.profiles[userId].experience = [
        ...(state.profiles[userId].experience || []),
        { ...experience, id: Date.now().toString() },
      ];
      saveToStorage(STORAGE_KEY, state.profiles);
    },
    removeExperience: (state, action) => {
      const { userId, experienceId } = action.payload;
      if (state.profiles[userId]?.experience) {
        state.profiles[userId].experience = state.profiles[userId].experience.filter(
          (exp) => exp.id !== experienceId
        );
        saveToStorage(STORAGE_KEY, state.profiles);
      }
    },
    updateSkills: (state, action) => {
      const { userId, skills } = action.payload;
      if (!state.profiles[userId]) {
        state.profiles[userId] = {};
      }
      state.profiles[userId].skills = skills;
      saveToStorage(STORAGE_KEY, state.profiles);
    },
  },
});

export const {
  updateProfile,
  setCandidateProfile,
  setCompanyProfile,
  addExperience,
  removeExperience,
  updateSkills,
} = profileSlice.actions;

// Selectors
export const selectProfile = (userId) => (state) => state.profile.profiles[userId] || null;
export const selectAllProfiles = (state) => state.profile.profiles;

export default profileSlice.reducer;
