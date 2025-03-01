import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import { authService } from "../api-service/authService";
import { useNavigate } from "react-router-dom";
import {FaHome, FaUsers, FaProjectDiagram, FaSignOutAlt, FaUserCircle, FaUserTie, FaCog} from "react-icons/fa";
import ProjectDashboard from "./projects/ProjectDashboard";
import Home from "../home/Home";
import AllUsers from "./users/AllUsers";
import Settings from "./users/Settings";
import Secretary from "./secretarry/Secretary";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedPage, setSelectedPage] = useState("home");

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = authService.getUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-sidebar">
        <div className="sidebar-header">Admin Panel</div>
        <ul className="sidebar-nav">
          <li onClick={() => setSelectedPage("home")}>
            <FaHome/> Home
          </li>
          <li onClick={() => setSelectedPage("manage-users")}>
            <FaUsers/> Manage Users
          </li>
          <li onClick={() => setSelectedPage("manage-projects")}>
            <FaProjectDiagram/> Manage Projects
          </li>
          <li onClick={() => setSelectedPage("manage-settings")}>
            <FaCog/> Settings
          </li>

          <li onClick={() => setSelectedPage("manage-secretary")}>
            <FaUserCircle/> Secretary
          </li>

        </ul>
        <div className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt/> Logout
        </div>
      </div>
      <div className="admin-content">
        <h1>Welcome, {user ? user.fullName : "Admin"}</h1>
        {selectedPage === "home" && <Home/>}
        {selectedPage === "manage-users" && <AllUsers/>}
        {selectedPage === "manage-projects" && <ProjectDashboard/>}
        {selectedPage === "manage-settings" && <Settings />}
        {selectedPage === "manage-secretary" && <Secretary />}
      </div>
    </div>
  );
};

export default AdminDashboard;