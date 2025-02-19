import {useState, useEffect} from 'react';
import {adminService} from '../../../api-service/adminAuth';

const Inventories = () => {
    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        const fetchInventories = async () => {
            const result = await adminService.getinventoryDataInput();
            if (result.success) {
                setInventories(result.response || []);
            }
        };

        fetchInventories();
    }, []);

    return (
        <div className="inventories-container">
            <h2>Inventories</h2>
            <hr />
            {inventories.length === 0 ? (
                <p className="no-inventories-message">No inventories found.</p>
            ) : (
                <div className="inventories-list">
                    {inventories.map((inventory, index) => (
                        <div key={index} className="inventory-card">
                            <h3 className="inventory-name">{inventory.name}</h3>
                            <p><strong>Category:</strong> {inventory.category}</p>
                            <p><strong>Stock:</strong> {inventory.stock} {inventory.stock_unit}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Inventories;