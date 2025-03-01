import { addPaymentMode, paymentModes } from "../../api-service/payment";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCopy } from "react-icons/fa";

const ModeOfPayment = () => {
    const [modeOfPayment, setModeOfPayment] = useState("Mpesa");
    const [phone, setPhone] = useState("254708374149");
    const [paymentDetails, setPaymentDetails] = useState([]);


    useEffect(() => {
        const fetchPaymentModes = async () => {
            try {
                const { success, response } = await paymentModes();
                if (success && Array.isArray(response)) {
                    setPaymentDetails(response);
                }
            } catch (error) {
                console.error("Error fetching payment modes:", error);
            }
        };

        fetchPaymentModes();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { success, message } = await addPaymentMode(modeOfPayment, phone);
            if (success) {
                alert(message);
            }
        } catch (error) {
            console.error("Error submitting payment mode:", error);
            alert(`Error submitting payment mode: ${error.message}`);
        }
    };

    const handleModeOfPaymentChange = (event) => {
        setModeOfPayment(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Mode of Payment</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Select Mode of Payment:</label>
                    <select className="form-control" value={modeOfPayment} onChange={handleModeOfPaymentChange}>
                        <option value="Mpesa">Mpesa</option>
                        <option value="MTN Mobile Money">MTN Mobile Money</option>
                        <option value="AirtelTigo Cash">AirtelTigo Cash</option>
                        <option value="Vodafone Cash">Vodafone Cash</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <p>
                        This phone number is for testing only. Please do not use it for real transactions.

                    </p>
                    <input type="text" className="form-control" value={"254708374149"} onChange={handlePhoneChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="mt-4">
                <h3>Payment Details</h3>
                <ul className="list-group">
                    {Array.isArray(paymentDetails) && paymentDetails.map(detail => (
                        <li key={detail.id} className="list-group-item">
                            <strong>Method:</strong> {detail.payment_method} <br />
                            <strong>Details:</strong> {detail.details}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ModeOfPayment;