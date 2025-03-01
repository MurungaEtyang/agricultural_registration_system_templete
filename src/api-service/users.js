import {authService} from "./authService";
import {api_url} from "./url";
import axios from "axios";

const API_URL = api_url.base_url;


export const getUsers = async () => {
    const token = authService.getToken();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.get(`${API_URL}/api/kenf/v1/all-users`, config);
            return { success: true, message: response.data.message, response: response.data };
        } catch (error) {
            console.error("Get All Users error:", error);
            return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
        }
    };


export const upgradeUser = async (userId, role) => {
    const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const body = { userId, role }

    try {
        const response = await axios.post(`${API_URL}/api/kenf/v1/update-user-role`, body, config);
        return { success: true, message: response.data.message };
    } catch (error) {
        console.error("Get Settings error:", error);
        return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
    }
}

export const addRole = async (role) => {
    const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const body = { role }

    try {
        const response = await axios.post(`${API_URL}/api/kenf/v1/add-role`, body, config);
        return { success: true, message: response.data.message };
    } catch (error) {
        console.error("Get Settings error:", error);
        return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
    }
}
export const getRoles = async () => {
    const token = authService.getToken();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${API_URL}/api/kenf/v1/roles`, config);
        return { success: true, message: response.data.message, response: response.data };
    } catch (error) {
        console.error("Get Settings error:", error);
        return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
    }
};

export const postQuantityAllocations = async (project_id, quantity) => {
    const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const body = { project_id, quantity };

    try {
        const response = await axios.post(`${API_URL}/api/kenf/v1/quantity-allocations`, body, config);
        return { success: true, message: response.data.message, response: response.data };
    } catch (error) {
        console.error("Post Quantity Allocations error:", error);
        return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
    }
};

export const getQuantityAllocations = async () => {
    const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(`${API_URL}/api/kenf/v1/quantity-allocations`, config);
        return { success: true, message: response.data.message, response: response.data };
    } catch (error) {
        console.error("Get Quantity Allocations error:", error);
        return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
    }
};