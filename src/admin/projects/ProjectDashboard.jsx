import './ProjectDashboard.css';
import AgriculturalProjects from "./AgriculturalProjects";
import {InventoryDataInput} from "./InventoryDataInput/InventoryDataInput";

import { useState } from 'react';
import Inventories from "./InventoryDataInput/inventories";
import AllocatedProducts from "./InventoryDataInput/AllocatedProducts";

const ProjectDashboard = () => {
  const [showInventory, setShowInventory] = useState(false);
  const [showInventories, setShowInventories] = useState(false);
  const [showAllocatedProducts, setShowAllocatedProducts] = useState(false);

  const handleInventoryClick = () => {
    setShowInventory(true);
    setShowInventories(false);
    setShowAllocatedProducts(false);
  };

  const handleInventoriesClick = () => {
    setShowInventory(false);
    setShowInventories(true);
    setShowAllocatedProducts(false);
  };

  const handleAllocatedProductsClick = () => {
    setShowInventory(false);
    setShowInventories(false);
    setShowAllocatedProducts(true);
  };

  const handleAgriculturalProjectsClick = () => {
    setShowInventory(false);
    setShowInventories(false);
    setShowAllocatedProducts(false);
  };

  return (
    <div className="project-dashboard-container">
      <nav className="navbar">
        <ul className="navbar-items navbar-items-container">
          <li className="navbar-item" onClick={handleAgriculturalProjectsClick}>Agricultural Projects</li>
          <li className="navbar-item" onClick={handleInventoryClick}>Inventory</li>
          <li className="navbar-item" onClick={handleInventoriesClick}>Inventories data</li>
          <li className="navbar-item" onClick={handleAllocatedProductsClick}>Allocated Products</li>
        </ul>
      </nav>
      {showInventory ? <InventoryDataInput/> : showInventories ? <Inventories/> : showAllocatedProducts ? <AllocatedProducts/> : <AgriculturalProjects/>}
    </div>
  );
};

export default ProjectDashboard;