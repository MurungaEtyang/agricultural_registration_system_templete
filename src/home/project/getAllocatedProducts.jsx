import { useEffect, useState } from "react";
import { authService } from "../../api-service/authService";

const AllocatedProducts = () => {
    const [allocatedProducts, setAllocatedProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAllocatedProducts = async () => {
            const result = await authService.getAllocatedProducts();
            if (result.success) {
                setAllocatedProducts(result.response || []);
            } else {
                setError(result.error);
            }
        };

        fetchAllocatedProducts();
    }, []);

    return (
        <div className="allocated-products-container">
            <h2 className="allocated-products-title">Allocated Products</h2>
            {error && <p className="error-message">{error}</p>}
            {allocatedProducts.length === 0 ? (
                <p className="no-products-message">No allocated products found.</p>
            ) : (
                <div className="allocated-products-list">
                    {allocatedProducts.map((product, index) => (
                        <div key={index} className="allocated-product-card">
                            <h3 className="product-owner">{product.full_name}</h3>
                            <p><strong>Project Name:</strong> {product.project_name}</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllocatedProducts;
