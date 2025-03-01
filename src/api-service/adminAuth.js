import axios from 'axios';
import {authService} from "./authService";
import {api_url} from "./url";

const API_URL = api_url.base_url;

export const adminService = {

    updateProducts: async (id, status) => {
        try {
            const token = authService.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.put(
                `${API_URL}/api/kenf/v1/projects/approve/${id}`,
                { status },
                config
            );

            return { success: true, message: response.data.message, response: response.data };
        } catch (error) {
            console.error("Update Agriculture Project error:", error);
            return {
                success: false,
                error: error.response ? error.response.data.message : 'An error occurred'
            };
        }
    },

    allAllocatedProducts : async () => {
        try {
            const token = authService.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.get(`${API_URL}/api/kenf/v1/all-projects`, config);
            return { success: true, message: response.data.message, response: response.data };
        } catch (error) {
            console.error("Get Agriculture Project error:", error);
            return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
        }
    },

    inventoryDataInput: async (name, category, stock, stockUnit) => {
        try {
            const token = authService.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const body = { name: name, category: category, stock: stock, stock_unit:stockUnit };
            const response = await axios.post(`${API_URL}/api/kenf/v1/inputs`, body, config);
            return { success: true, message: response.data.message, response: response.data };
        } catch (error) {
            console.error("Inventory Data Input error:", error);
            return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
        }
    },

    getinventoryDataInput: async () => {
        try {
            const token = authService.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.get(`${API_URL}/api/kenf/v1/all-inputs`, config);
            return { success: true, message: response.data.message, response: response.data };
        } catch (error) {
            console.error("Get Inventory Data Input error:", error);
            return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
        }
    },


    allocations: async (project_id, input_id, quantity) => {
        try {
            const token = authService.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const body = { project_id: project_id, input_id: input_id, quantity: quantity };
            const response = await axios.post(`${API_URL}/api/kenf/v1/allocations`, body, config);
            return { success: true, message: response.data.message, response: response.data };
        } catch (error) {
            console.error("Get Inventory Data Input error:", error);
            return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
        }
    },


    farmersProducts: async (project_id, input_id, quantity, mpesa_phone_number) => {
        try {
            const token = authService.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const body = { project_id: project_id, input_id: input_id, quantity: quantity, mpesa_phone_number: mpesa_phone_number };
            const response = await axios.post(`${API_URL}/api/kenf/v1/quantity-allocations`, body, config);
            return { success: true, message: response.data.message, response: response.data };
        } catch (error) {
            console.error("Get Inventory Data Input error:", error);
            return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
        }
    },


    AllocatedProducts : async () => {
        try {
            const token = authService.getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.get(`${API_URL}/api/kenf/v1/all-allocations`, config);
            return { success: true, message: response.data.message, response: response.data };
        } catch (error) {
            console.error("Get Agriculture Project error:", error);
            return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
        }
    },





};