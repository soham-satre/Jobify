import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export const resumeService = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  get: async () => {
    const response = await api.get('/resume');
    return response.data;
  },

  delete: async () => {
    const response = await api.delete('/resume');
    return response.data;
  }
};

export const jobService = {
  getAll: async (params) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  getMatched: async () => {
    const response = await api.get('/jobs/matched');
    return response.data;
  },

  create: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  update: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  }
};

export const applicationService = {
  apply: async (applicationData) => {
    const response = await api.post('/applications', applicationData);
    return response.data;
  },

  getMy: async () => {
    const response = await api.get('/applications');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.put(`/applications/${id}`, { status });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
  }
};
