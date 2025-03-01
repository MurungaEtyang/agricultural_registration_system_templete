import { useEffect, useState } from "react";
import { adminService } from "../../api-service/adminAuth";
import 'bootstrap/dist/css/bootstrap.min.css';
import {postQuantityAllocations} from "../../api-service/users";

const ConfirmedAndAllocated = () => {
    const [allocatedProducts, setAllocatedProducts] = useState([]);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchAllocatedProducts = async () => {
            const result = await adminService.AllocatedProducts();
            if (result.success) {
                setAllocatedProducts(result.response || []);
            } else {
                setError(result.error);
            }
        };

        fetchAllocatedProducts();
    }, []);

    const filteredProducts = allocatedProducts.filter(product => {
        const productName = product?.product_name?.toLowerCase() || "";
        const fullName = product?.full_name?.toLowerCase() || "";
        const searchTermLower = searchTerm.toLowerCase();
        return productName.includes(searchTermLower) || fullName.includes(searchTermLower);
    });

    const handleQuantityChange = (productId, quantity) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: quantity
        }));
    };

    const handleSubmit = async (projectId, event) => {
        event.preventDefault();
        const quantity = quantities[projectId];
        if (quantity) {
            try {
                const { success, message } = await postQuantityAllocations(projectId, quantity);
                if (success) {
                    alert(message);
                }
            } catch (error) {
                console.error("Error posting quantity allocation:", error);
                alert(`Error posting quantity allocation: ${error.message}`);
            }
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-3">Allocated Products</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="row mt-3">
                <div className="col-md-12">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search by product name or full name"
                        className="form-control"
                    />
                </div>
            </div>
            {filteredProducts.length === 0 ? (
                <p className="text-center">No allocated products found.</p>
            ) : (
                <div className="row mt-3">
                    {filteredProducts.map((product, index) => (
                        <div key={index} className="col-md-6 mt-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{product?.full_name}</h5>
                                    <p className="card-text"><strong>Project Name:</strong> {product?.project_name}</p>
                                    <form onSubmit={event => handleSubmit(product?.project_id, event)}>
                                        <div className="form-group">
                                            <label>Quantity Brought:</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={quantities[product?.project_id] || 0}
                                                onChange={event => handleQuantityChange(product?.project_id, event.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ConfirmedAndAllocated;