// ============================================================
// AfriHire — Notifications Slice
// Email-style notification system with status change triggers
// ============================================================

import { createSlice } from '@reduxjs/toolkit';
import { saveToStorage, loadFromStorage } from '../utils/helpers';

const STORAGE_KEY = 'afrihire_notifications';

const persistedNotifications = loadFromStorage(STORAGE_KEY, []);

const initialState = {
  notifications: persistedNotifications,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        ...action.payload,
        read: false,
        createdAt: new Date().toISOString(),
      };
      state.notifications.unshift(notification);
      saveToStorage(STORAGE_KEY, state.notifications);
    },
    markAsRead: (state, action) => {
      const notif = state.notifications.find((n) => n.id === action.payload);
      if (notif) {
        notif.read = true;
        saveToStorage(STORAGE_KEY, state.notifications);
      }
    },
    markAllAsRead: (state, action) => {
      const userId = action.payload;
      state.notifications.forEach((n) => {
        if (!userId || !n.userId || n.userId === userId) {
          n.read = true;
        }
      });
      saveToStorage(STORAGE_KEY, state.notifications);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
      saveToStorage(STORAGE_KEY, state.notifications);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      saveToStorage(STORAGE_KEY, []);
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
} = notificationsSlice.actions;

// Notification type factories
export const createApplicationNotification = (jobTitle, companyName) => ({
  type: 'application',
  title: 'Application Submitted',
  message: `Your application for "${jobTitle}" at ${companyName} has been submitted successfully.`,
  icon: '📨',
});

export const createStatusChangeNotification = (jobTitle, status) => ({
  type: 'status_change',
  title: 'Application Status Updated',
  message: `Your application for "${jobTitle}" has been ${status.toLowerCase()}.`,
  icon: status === 'Shortlisted' ? '🎉' : status === 'Reviewed' ? '👀' : status === 'Rejected' ? '😔' : '📋',
});

export const createNewApplicantNotification = (candidateName, jobTitle) => ({
  type: 'new_applicant',
  title: 'New Application Received',
  message: `${candidateName} has applied for "${jobTitle}".`,
  icon: '👤',
});

const visibleForUser = (notifications, userId) => {
  if (!userId) return [];
  return notifications.filter((n) => !n.userId || n.userId === userId);
};

// Selectors
export const selectAllNotifications = (state) => state.notifications.notifications;

/** Notifications addressed to this user, or broadcast (no userId) */
export const selectNotificationsForUser = (userId) => (state) =>
  visibleForUser(state.notifications.notifications, userId);

export const selectUnreadCountForUser = (userId) => (state) =>
  visibleForUser(state.notifications.notifications, userId).filter((n) => !n.read).length;

export const selectUnreadNotifications = (state) =>
  state.notifications.notifications.filter((n) => !n.read);

export default notificationsSlice.reducer;
