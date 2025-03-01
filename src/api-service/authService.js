import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import AgricultureProjectForm from "../home/project/AgricultureProjectForm";
import {api_url} from "./url";

const API_URL = api_url.base_url;

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

    register: async (fullName, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/api/kenf/v1/register/users`, { fullName, email, password });
            if (response.data.message) {
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


    AgricultureProjectForm: async (project_name, crop_type, expected_yield, land_size, location, land_size_unit, expected_yield_unit) => {
        try {
            const token = authService.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post(`${API_URL}/api/kenf/v1/projects`,
                { project_name, crop_type, expected_yield, land_size, location, land_size_unit, expected_yield_unit }, config);

            return { success: true, message: response.data.message };
        } catch (error) {
            console.error("Create Agriculture Project error:", error);
            return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
        }
    },


    GetAgricultureProjectForm: async () => {
        try {
            const token = authService.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.get(`${API_URL}/api/kenf/v1/user-projects`, config);
            return { success: true, message: response.data.message, response: response.data };
        } catch (error) {
            console.error("Get Agriculture Project error:", error);
            return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
        }
    },

    getAllocatedProducts : async () => {
        try {
            const token = authService.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.get(`${API_URL}/api/kenf/v1/user-allocations`, config);
            return { success: true, message: response.data.message, response: response.data };
        } catch (error) {
            console.error("Get Agriculture Project error:", error);
            return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
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