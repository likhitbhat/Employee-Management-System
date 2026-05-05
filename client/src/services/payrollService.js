import api from './api';

export const payrollService = {
  getPayrollRecords: async (params) => {
    return api.get('/payroll', { params });
  },
  runPayroll: async (data) => {
    return api.post('/payroll/run', data);
  },
  getMyPayslips: async (params) => {
    return api.get('/payroll/me', { params });
  },
  getPayrollRecord: async (id) => {
    return api.get(`/payroll/${id}`);
  },
  updatePaymentStatus: async (id, data) => {
    return api.put(`/payroll/${id}/status`, data);
  },
  generatePayslip: async (id) => {
    return api.get(`/payroll/${id}/payslip`, { responseType: 'blob' });
  },
  getSummary: async (params) => {
    return api.get('/payroll/summary', { params });
  }
};
