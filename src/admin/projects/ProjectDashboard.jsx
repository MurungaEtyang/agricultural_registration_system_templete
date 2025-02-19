import './ProjectDashboard.css';
import AgriculturalProjects from "./AgriculturalProjects";
import {InventoryDataInput} from "./InventoryDataInput/InventoryDataInput";

import { useState } from 'react';
import Inventories from "./InventoryDataInput/inventories";

const ProjectDashboard = () => {
  const [showInventory, setShowInventory] = useState(false);
  const [showInventories, setShowInventories] = useState(false);

  const handleInventoryClick = () => {
    setShowInventory(true);
    setShowInventories(false);
  };

  const handleInventoriesClick = () => {
    setShowInventory(false);
    setShowInventories(true);
  };

  const handleAgriculturalProjectsClick = () => {
    setShowInventory(false);
    setShowInventories(false);
  };

  return (
    <div className="project-dashboard-container">
      <nav className="navbar">
        <ul className="navbar-items navbar-items-container">
          <li className="navbar-item" onClick={handleAgriculturalProjectsClick}>Agricultural Projects</li>
          <li className="navbar-item" onClick={handleInventoryClick}>Inventory</li>
          <li className="navbar-item" onClick={handleInventoriesClick}>Inventories data</li>
        </ul>
      </nav>
      {showInventory ? <InventoryDataInput/> : showInventories ? <Inventories/> : <AgriculturalProjects/>}
    </div>
  );
};

export default ProjectDashboard;