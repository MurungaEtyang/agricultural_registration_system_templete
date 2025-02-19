import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import { authService } from "../api-service/authService";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaProjectDiagram, FaSignOutAlt } from "react-icons/fa";
import ProjectDashboard from "./projects/ProjectDashboard";
import Home from "../home/Home";

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
            <FaHome /> Home
          </li>
          <li onClick={() => setSelectedPage("manage-users")}>
            <FaUsers /> Manage Users
          </li>
          <li onClick={() => setSelectedPage("manage-projects")}>
            <FaProjectDiagram /> Manage Projects
          </li>
        </ul>
        <div className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </div>
      </div>
      <div className="admin-content">
        <h1>Welcome, {user ? user.fullName : "Admin"}</h1>
        {selectedPage === "home" && <Home/>}
        {selectedPage === "manage-users" && <h2>Manage Users</h2>}
        {selectedPage === "manage-projects" && <ProjectDashboard/>}
      </div>
    </div>
  );
};

export default AdminDashboard;