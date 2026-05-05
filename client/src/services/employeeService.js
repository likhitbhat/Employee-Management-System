import api from './api';

export const employeeService = {
  getEmployees: async (params) => {
    return api.get('/employees', { params });
  },
  getEmployee: async (id) => {
    return api.get(`/employees/${id}`);
  },
  createEmployee: async (data) => {
    return api.post('/employees', data);
  },
  updateEmployee: async (id, data) => {
    return api.put(`/employees/${id}`, data);
  },
  deleteEmployee: async (id) => {
    return api.delete(`/employees/${id}`);
  },
  getStats: async () => {
    return api.get('/employees/stats/summary');
  }
};
