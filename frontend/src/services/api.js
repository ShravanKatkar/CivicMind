import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://shravan001-civicmind-backend.hf.space';

console.log('API Configuration:', {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    API_URL: API_URL
});

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('civicmind_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ===== Auth API =====
// Districts are static data — exact names must match backend/models/districts.py
export const getDistricts = async () => {
    return {
        districts: [
            'Mumbai City', 'Mumbai Suburban', 'Thane', 'Raigad', 'Palghar',
            'Pune', 'Ahmednagar', 'Solapur', 'Satara', 'Sangli',
            'Kolhapur', 'Ratnagiri', 'Sindhudurg', 'Nashik', 'Dhule',
            'Nandurbar', 'Jalgaon', 'Aurangabad', 'Jalna', 'Beed',
            'Latur', 'Osmanabad', 'Parbhani', 'Hingoli', 'Nanded',
            'Nagpur', 'Wardha', 'Bhandara', 'Gondia', 'Chandrapur',
            'Gadchiroli', 'Amravati', 'Akola', 'Washim', 'Buldhana', 'Yavatmal'
        ]
    };
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/api/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

export const loginUser = async (role, credentials) => {
    try {
        const endpoint = role === 'worker'
            ? '/api/auth/login/worker'
            : '/api/auth/login/supervisor';
        const response = await api.post(endpoint, credentials);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const assessImage = async (file, context) => {
    // ... rest of the file

    const formData = new FormData();
    formData.append('file', file);
    formData.append('site_context', context);

    const response = await api.post('/api/v1/assess/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const sendVoiceCommand = async (audioBlob) => {
    const formData = new FormData();
    // Ensure consistency with backend expectation
    formData.append('file', audioBlob, 'command.wav');

    const response = await api.post('/voice/command', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const sendAlert = async (supervisorId, message, location) => {
    const response = await api.post('/alert/', {
        supervisor_id: supervisorId,
        message,
        location
    });
    return response.data;
};

// ===== Reports API =====
export const getReports = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.riskLevel) params.append('risk_level', filters.riskLevel);
        if (filters.status) params.append('status', filters.status);

        const response = await api.get(`/api/reports?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw error;
    }
};

export const getIncidentDetail = async (reportId) => {
    try {
        const response = await api.get(`/api/reports/${reportId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching incident detail:', error);
        throw error;
    }
};

export const getFullReport = async (reportId) => {
    try {
        const response = await api.get(`/api/reports/${reportId}/full`);
        return response.data;
    } catch (error) {
        console.error('Error fetching full report:', error);
        throw error;
    }
};

// ===== Worker API =====
export const getWorkerProfile = async () => {
    try {
        const response = await api.get('/api/worker/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching worker profile:', error);
        throw error;
    }
};

export const updateWorkerProfile = async (profileData) => {
    try {
        const response = await api.put('/api/worker/profile', profileData);
        return response.data;
    } catch (error) {
        console.error('Error updating worker profile:', error);
        throw error;
    }
};

export const getWorkerStats = async () => {
    try {
        const response = await api.get('/api/worker/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching worker stats:', error);
        throw error;
    }
};

export const getWorkerAchievements = async () => {
    try {
        const response = await api.get('/api/worker/achievements');
        return response.data;
    } catch (error) {
        console.error('Error fetching achievements:', error);
        throw error;
    }
};

export const getWorkerTraining = async () => {
    try {
        const response = await api.get('/api/worker/training');
        return response.data;
    } catch (error) {
        console.error('Error fetching training:', error);
        throw error;
    }
};

export const getWorkerSchedule = async () => {
    try {
        const response = await api.get('/api/worker/schedule');
        return response.data;
    } catch (error) {
        console.error('Error fetching schedule:', error);
        throw error;
    }
};

// ===== Sites API =====
export const getSites = async () => {
    try {
        const response = await api.get('/api/sites');
        return response.data;
    } catch (error) {
        console.error('Error fetching sites:', error);
        throw error;
    }
};

export default api;
