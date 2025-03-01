import { useState, useEffect } from "react";
import { getQuantityAllocations } from "../../api-service/users";
import { adminPaymentModes } from "../../api-service/payment";
import { mpesaPayment } from "../../api-service/mpesa_payment";
import { FaSpinner } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

const ConfirmedProducts = ({ user_id }) => {
    const [allocations, setAllocations] = useState([]);
    const [error, setError] = useState("");
    const [paymentMethods, setPaymentMethods] = useState({})
    const [mpesaResponse, setMpesaResponse] = useState({});
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);

    useEffect(() => {
        const fetchAllocationsAndPayments = async () => {
            try {
                const result = await getQuantityAllocations();
                if (result.success) {
                    setAllocations(result.response || []);

                    if (result.response.length > 0) {
                        const userIds = [...new Set(result.response.map(item => item.id))];
                        const paymentMethodsObj = {};

                        for (const id of userIds) {
                            const { success, response } = await adminPaymentModes(id);

                            if (success) {
                                response.forEach(item => {
                                    if (!paymentMethodsObj[item.user_id]) {
                                        paymentMethodsObj[item.user_id] = [];
                                    }
                                    const existingMethod = paymentMethodsObj[item.user_id].find(pm => pm.payment_method === item.payment_method && pm.details === item.details);
                                    if (!existingMethod) {
                                        paymentMethodsObj[item.user_id].push({
                                            payment_method: item.payment_method,
                                            details: item.details
                                        });
                                    }
                                });
                            }
                        }

                        console.log(paymentMethodsObj);

                        setPaymentMethods(paymentMethodsObj);
                    }
                } else {
                    setError(result.error);
                }
            } catch (error) {
                console.error("Error getting quantity allocations:", error);
                setError("Failed to fetch data.");
            }
        };

        fetchAllocationsAndPayments();
    }, [user_id]);

    const handleSendPaymentClick = async (id, amount, phoneNumber) => {
        setIsPaymentLoading(true);
        const { success, error, message, response } = await mpesaPayment(id, amount, phoneNumber);

        setIsPaymentLoading(false);

        if (success) {
            console.log(response);
            setMpesaResponse(response);
        } else {
            if (error) {
                setMpesaResponse(error);
                setError(error);
            } else if (message) {
                setError(message);
            }
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Confirmed Products</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {allocations.length === 0 ? (
                <p className="text-center">No quantity allocations found.</p>
            ) : (
                <div className="row">
                    {allocations.map((allocation, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{allocation.full_name}</h5>
                                    <p className="card-text">
                                        <strong>Quantity brought by farmer:</strong> {allocation.allocated_quantity}<br/>
                                        <strong>Allocated Price:</strong> {allocation.allocated_price}<br/>
                                        <strong>Payment Method:</strong>
                                        {paymentMethods[allocation.id] && paymentMethods[allocation.id].length > 0 ? (
                                            paymentMethods[allocation.id].map((pm, index) => (
                                                <div key={index}>
                                                    {pm.payment_method} - {pm.details}
                                                </div>
                                            ))
                                        ) : (
                                            <div>No payment method available</div>
                                        )}
                                    </p>
                                    <button onClick={() => handleSendPaymentClick(allocation.id, allocation.allocated_price, paymentMethods[allocation.id][0].details)}>
                                        {isPaymentLoading ? (
                                            <FaSpinner className="text-primary" />
                                        ) : (
                                            <>Send Payment</>
                                        )}
                                    </button>

                                    <div style={{
                                        backgroundColor: 'black',
                                        color: 'white',
                                        padding: '5px',
                                        borderRadius: '5px'
                                    }}>
                                        {mpesaResponse.success && (
                                            <>
                                                <pre>
                                                    {JSON.stringify(mpesaResponse, null, 2)}
                                                </pre>
                                                <p>
                                                    Transaction ID: {mpesaResponse.result.TransactionID}<br/>
                                                    Amount: {mpesaResponse.result.Amount}<br/>
                                                    Result Desc: {mpesaResponse.result.ResultDesc}<br/>
                                                    Response Desc: {mpesaResponse.ResponseDescription}<br/>
                                                </p>
                                            </>
                                        )}
                                        <p>{mpesaResponse.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ConfirmedProducts;