import api from './api';

export const reportService = {
  getHeadcount: async () => {
    return api.get('/reports/headcount');
  },
  getAttendanceSummary: async (params) => {
    return api.get('/reports/attendance', { params });
  },
  getPayrollSummary: async (params) => {
    return api.get('/reports/payroll', { params });
  },
  getAttrition: async (params) => {
    return api.get('/reports/attrition', { params });
  }
};


