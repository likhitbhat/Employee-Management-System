import api from './api';

export const leaveService = {
  applyLeave: async (data) => {
    return api.post('/leaves/apply', data);
  },
  getMyLeaves: async (params) => {
    return api.get('/leaves/me', { params });
  },
  getLeaveBalance: async () => {
    return api.get('/leaves/balance');
  },
  getPendingLeaves: async (params) => {
    return api.get('/leaves/pending', { params });
  },
  getAllLeaves: async (params) => {
    return api.get('/leaves', { params });
  },
  approveLeave: async (id, data) => {
    return api.put(`/leaves/${id}/approve`, data);
  },
  rejectLeave: async (id, data) => {
    return api.put(`/leaves/${id}/reject`, data);
  },
  cancelLeave: async (id) => {
    return api.put(`/leaves/${id}/cancel`);
  },
  getTeamCalendar: async (params) => {
    return api.get('/leaves/calendar', { params });
  }
};
