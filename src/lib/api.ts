// API Configuration and Helper Functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Get user data from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Set auth data in localStorage
export const setAuthData = (token: string, user: any) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// Clear auth data
export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// Auth API
export const authAPI = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
    role: string;
    classLevel?: number;
  }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (data: { email: string; password: string; role: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getMe: async () => {
    return apiRequest('/auth/me');
  },
};

// Quiz API
export const quizAPI = {
  getByTopic: async (topicId: string) => {
    return apiRequest(`/quiz/topic/${topicId}`);
  },

  submit: async (topicId: string, answers: number[]) => {
    return apiRequest(`/quiz/topic/${topicId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  },

  getAll: async () => {
    return apiRequest('/quiz/all');
  },
};

// Progress API
export const progressAPI = {
  get: async () => {
    return apiRequest('/progress');
  },

  getBySubject: async (subject: string) => {
    return apiRequest(`/progress/subject/${subject}`);
  },

  updateStreak: async () => {
    return apiRequest('/progress/streak', {
      method: 'POST',
    });
  },
};

// 3D Models API
export const modelsAPI = {
  getAll: async () => {
    return apiRequest('/models');
  },

  getByTopic: async (topicId: string) => {
    return apiRequest(`/models/topic/${topicId}`);
  },

  getBySubject: async (subject: string) => {
    return apiRequest(`/models/subject/${subject}`);
  },
};

// Chatbot API
export const chatbotAPI = {
  sendMessage: async (message: string, context?: string) => {
    return apiRequest('/chatbot/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    });
  },
};
