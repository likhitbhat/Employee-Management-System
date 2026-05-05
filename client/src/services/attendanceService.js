import api from './api';

export const attendanceService = {
  clockIn: async (locationInfo) => {
    return api.post('/attendance/clock-in', locationInfo);
  },
  clockOut: async (locationInfo) => {
    return api.post('/attendance/clock-out', locationInfo);
  },
  getToday: async () => {
    return api.get('/attendance/today');
  },
  getMyAttendance: async (params) => {
    return api.get('/attendance/me', { params });
  },
  getTeamAttendance: async (params) => {
    return api.get('/attendance/team', { params });
  },
  getSummary: async (params) => {
    return api.get('/attendance/summary', { params });
  }
};
