import ConfirmedAndAllocated from "./ConfirmedAndAllocated";
import ConfirmedProducts from "./ConfirmedProducts";
import { useState } from "react";

const Secretary = () => {
    const [showConfirmedAndAllocated, setShowConfirmedAndAllocated] = useState(true);

    const handleConfirmedAndAllocatedClick = () => {
        setShowConfirmedAndAllocated(true);
    };

    const handleConfirmedProductsClick = () => {
        setShowConfirmedAndAllocated(false);
    };

    return (
        <div>
            <div className="btn-group mb-3" role="group" aria-label="Basic example">
                <button 
                    type="button" 
                    className="btn btn-success mx-1" 
                    onClick={handleConfirmedAndAllocatedClick}
                >
                    Confirmed and Allocated
                </button>
                <button 
                    type="button" 
                    className="btn btn-info mx-1" 
                    onClick={handleConfirmedProductsClick}
                >
                    Confirmed Products
                </button>
            </div>
            {showConfirmedAndAllocated ? <ConfirmedAndAllocated /> : <ConfirmedProducts />}
        </div>
    );
};

export default Secretary;