import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const API_URL = "http://localhost:5000";

export const authService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/api/kenf/v1/login/users`, { email, password });
            if (response.data.token) {
                const token = response.data.token;
                const decodedToken = jwtDecode(token);

                localStorage.setItem('authToken', token);
                localStorage.setItem('loggedInUser', JSON.stringify(decodedToken));
                return { success: true, message: response.data.message };
            } else {
                return { success: false, error: response.data.error || 'Registration failed. Please try again.' };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
        }
    },

    register: async (fullName, email, password, role) => {
        try {
            const response = await axios.post(`${API_URL}/api/kenf/v1/register/users`, { fullName, email, password, role });
            if (response.data.token) {
                const token = response.data.token;
                const decodedToken = jwtDecode(token);

                localStorage.setItem('authToken', token);
                localStorage.setItem('loggedInUser', JSON.stringify(decodedToken));
                return { success: true, message: response.data.message };
            } else {
                return { success: false, error: response.data.error || 'Registration failed. Please try again.' };
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return { success: false, error: error.response.data.error };
            }
            console.error("Registration error:", error);
            return { success: false, error: 'An error occurred' };
        }
    },

    getUser: () => {
        return JSON.parse(localStorage.getItem('loggedInUser'));
    },

    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('loggedInUser');
    },

    isLoggedIn: () => {
        return !!localStorage.getItem('authToken');
    },

    getToken: () => {
        return localStorage.getItem('authToken');
    }
};