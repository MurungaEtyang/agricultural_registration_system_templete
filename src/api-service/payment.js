import {authService} from "./authService";
import axios from "axios";
import {api_url} from "./url";

const API_URL = api_url.base_url;
export const addPaymentMode = async (payment_method, details) => {
    const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const body = { payment_method, details };

    try {
        const response = await axios.post(`${API_URL}/api/kenf/v1/payment-modes`, body, config);
        return { success: true, message: response.data.message, response: response.data };
    } catch (error) {
        console.error("Post Quantity Allocations error:", error);
        return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
    }
};

export const paymentModes = async () => {
    const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${API_URL}/api/kenf/v1/user-payment-modes`, config);
        return { success: true, message: response.data.message, response: response.data };
    } catch (error) {
        console.error("Get Quantity Allocations error:", error);
        return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
    }
};

export const adminPaymentModes = async (user_id) => {
    const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.put(`${API_URL}/api/kenf/v1/specific-payment-modes/${user_id}`, config);
        return { success: true, message: response.data.message, response: response.data };
    } catch (error) {
        console.error("Get Quantity Allocations error:", error);
        return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
    }
};