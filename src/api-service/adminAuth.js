import axios from 'axios';

const API_URL = "http://localhost:5000";

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/kenf/v1/login/users`, { email, password });
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            return { success: true, message: response.data.message, token: response.data.token };
        } else {
            return { success: false, error: "Invalid login response" };
        }
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: error.response ? error.response.data.message : "An error occurred" };
    }
};
