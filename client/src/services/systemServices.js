import api from './api';

export const performanceService = {
  getCycles: async (params) => api.get('/performance/cycles', { params }),
  createCycle: async (data) => api.post('/performance/cycles', data),
  getMyPerformance: async (params) => api.get('/performance/me', { params }),
  getPerformance: async (id) => api.get(`/performance/${id}`),
  updatePerformance: async (id, data) => api.put(`/performance/${id}`, data),
  submitFeedback: async (id, data) => api.post(`/performance/${id}/feedback`, data),
  getMyGoals: async (params) => api.get('/performance/goals/me', { params }),
  createGoal: async (data) => api.post('/performance/goals', data),
  updateGoal: async (id, data) => api.put(`/performance/goals/${id}`, data)
};

export const recruitmentService = {
  getJobs: async (params) => api.get('/recruitment/jobs', { params }),
  createJob: async (data) => api.post('/recruitment/jobs', data),
  updateJob: async (id, data) => api.put(`/recruitment/jobs/${id}`, data),
  deleteJob: async (id) => api.delete(`/recruitment/jobs/${id}`),
  getCandidates: async (jobId, params) => api.get(`/recruitment/jobs/${jobId}/candidates`, { params }),
  addCandidate: async (jobId, data) => api.post(`/recruitment/jobs/${jobId}/candidates`, data),
  updateCandidate: async (id, data) => api.put(`/recruitment/candidates/${id}`, data),
  getPipeline: async () => api.get('/recruitment/pipeline')
};

export const documentService = {
  getMyDocuments: async (params) => api.get('/documents/me', { params }),
  getAllDocuments: async (params) => api.get('/documents', { params }),
  uploadDocument: async (data) => api.post('/documents/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteDocument: async (id) => api.delete(`/documents/${id}`),
  getPolicies: async () => api.get('/documents/policies'),
  getExpiringDocuments: async () => api.get('/documents/expiring')
};

export const settingsService = {
  getCompanyProfile: async () => api.get('/settings/company'),
  updateCompanyProfile: async (data) => api.put('/settings/company', data),
  getLeavePolicy: async () => api.get('/settings/leave-policy'),
  updateLeavePolicy: async (data) => api.put('/settings/leave-policy', data),
  getPayrollConfig: async () => api.get('/settings/payroll-config'),
  updatePayrollConfig: async (data) => api.put('/settings/payroll-config', data),
  getAuditLogs: async (params) => api.get('/settings/audit-logs', { params })
};
