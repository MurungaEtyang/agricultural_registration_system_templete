import {adminService} from "../../../api-service/adminAuth";

export const InventoryDataInput = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const category = e.target.elements.category.value;
        const stock = e.target.elements.stock.value;
        const stockUnit = e.target.elements.stockUnit.value;

        const result = await adminService.inventoryDataInput(name, category, stock, stockUnit);
        if (result.success) {
            alert(result.message);
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="inventory-data-input-container">
            <h2>Inventory Data Input</h2>
            <div className="inventory-data-input">
                <h4>Fertilizer</h4>
                <form onSubmit={handleSubmit}>
                    <div className="inventory-data-input-fields">
                        <div className="inventory-data-input-field">
                            <label>Category</label>
                            <select name="category">
                                <option value="fertilizer">Fertilizer</option>
                                <option value="pesticide">Pesticide</option>
                                <option value="seed">Seed</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="inventory-data-input-field">
                            <label>Name</label>
                            <input type="text" placeholder="NPK" name="name"/>
                        </div>

                        <div className="inventory-data-input-field">
                            <div className="inventory-data-input-field">
                                <label>Stock Unit</label>
                                <select name="stockUnit">
                                    <option value="kg">Kilograms</option>
                                    <option value="liters">Liters</option>
                                    <option value="bags">Bags</option>
                                    <option value="pieces">Pieces</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <label>Stock</label>
                            <input type="number" placeholder="8000" name="stock"/>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};