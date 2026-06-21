import axios from 'axios';
import { getToken, removeToken } from '@/lib/auth-token';

/**
 * Isolated Axios instance.
 * All API requests must go through this instance — never use the global axios directly.
 */
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'ngrok-skip-browser-warning': 'true',
    },
});

/**
 * Request interceptor: inject Bearer token on every outgoing request.
 */
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Response interceptor: handle 401 Unauthorized globally.
 * Clears the stored token and redirects the user to the login page.
 */
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeToken();
            // Redirect to login — avoids a hard dependency on react-router
            if (typeof window !== 'undefined') {
                window.location.href = '/auth/masuk';
            }
        }
        return Promise.reject(error);
    }
);

export { axiosInstance };
