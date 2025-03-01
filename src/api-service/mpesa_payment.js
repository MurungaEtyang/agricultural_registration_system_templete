import {authService} from "./authService";
import axios from "axios";
import {api_url} from "./url";

const API_URL = api_url.base_url;
export const mpesaPayment = async (userid,amount, phoneNumber) => {
    const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const body = { user_id: userid, phone: phoneNumber, amount: amount };

    try {
        const response = await axios.post(`${API_URL}/api/send-money`, body, config);
        return { success: true, message: response.data.message, response: response.data };
    } catch (error) {
        console.error("Post Quantity Allocations error:", error);
        return { success: false, error: error.response ? error.response.data.message : 'An error occurred' };
    }
};

