// ============================================================
// AfriHire — useAuth Hook
// Convenience hook for authentication state
// ============================================================

import { useSelector, useDispatch } from 'react-redux';
import {
  selectAuth,
  selectUser,
  selectRole,
  selectIsAuthenticated,
  selectIsCandidate,
  selectIsCompany,
  selectSavedJobs,
  loginUser,
  registerUser,
  logout,
  toggleSavedJob,
  updateUserProfile,
} from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const role = useSelector(selectRole);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isCandidate = useSelector(selectIsCandidate);
  const isCompany = useSelector(selectIsCompany);
  const savedJobs = useSelector(selectSavedJobs);

  const handleLogin = (credentials) => dispatch(loginUser(credentials));
  const handleRegister = (userData) => dispatch(registerUser(userData));
  const handleLogout = () => dispatch(logout());
  const handleToggleSavedJob = (jobId) => dispatch(toggleSavedJob(jobId));
  const handleUpdateProfile = (profileData) => dispatch(updateUserProfile(profileData));

  const isJobSaved = (jobId) => savedJobs.includes(jobId);

  return {
    user,
    role,
    isAuthenticated,
    isCandidate,
    isCompany,
    savedJobs,
    loading: auth.loading,
    error: auth.error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    toggleSavedJob: handleToggleSavedJob,
    updateProfile: handleUpdateProfile,
    isJobSaved,
  };
};
