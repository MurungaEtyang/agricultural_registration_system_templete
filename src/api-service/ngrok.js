import {authService} from "./authService";
import axios from "axios";
import {api_url} from "./url";

const API_URL = api_url.base_url;
export const addNgrokUrl = async (ngrokUrl) => {
    const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const body = { url: ngrokUrl };

    try {
        const response = await axios.post(`${API_URL}/api/ngrok-url`, body, config);
        return { success: true, message: response.data.message, response: response.data };
    } catch (error) {
        console.error("Post Quantity Allocations error:", error);
        return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
    }
};


export const getNgrokUrls = async () => {
    const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${API_URL}/api/get-ngrok-url`, config);
        return { success: true, message: response.data.message, response: response.data };
    } catch (error) {
        console.error("Get Quantity Allocations error:", error);
        return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
    }
}