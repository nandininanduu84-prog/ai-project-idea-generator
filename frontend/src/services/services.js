import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  logout: () => api.post('/auth/logout'),
};

export const projectService = {
  generateProjects: (data) => api.post('/projects/generate', data),
  getAllProjects: (params) => api.get('/projects', { params }),
  getProjectById: (id) => api.get(`/projects/${id}`),
  saveProject: (data) => api.post('/projects/save', data),
  getSavedProjects: (params) => api.get('/projects/saved/all', { params }),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  getProjectHistory: () => api.get('/projects/history/all'),
};

export const aiService = {
  refineProject: (data) => api.post('/ai/refine', data),
  chatAboutProject: (data) => api.post('/ai/chat', data),
};

export const adminService = {
  getDashboardStats: () => api.get('/admin/stats'),
  getAllUsers: (params) => api.get('/admin/users', { params }),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  deleteProject: (projectId) => api.delete(`/admin/projects/${projectId}`),
};
