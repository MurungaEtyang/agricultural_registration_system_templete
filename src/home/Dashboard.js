import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api-service/authService";
import { FaUserCircle } from "react-icons/fa";
import AgricultureProjectForm from "./project/AgricultureProjectForm";
import AgricultureProjects from "./project/AgricultureProjects";
import AllocatedProducts from "./project/getAllocatedProducts";
import "./dashboard.css";
import Home from "./Home";
import ModeOfPayment from "./payment/ModeOfPayment";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [showSection, setShowSection] = useState("home");
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = authService.getUser();
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const handleLogout = () => {
        authService.logout();
        navigate("/login");
    };

    const handleSectionChange = (section) => {
        setShowSection(section);
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="logo">AgriDashboard</div>
                <ul style={{
                    gap: "10px",
                    margin: "10px 0"
                }}>
                    <li className="btn btn-primary" onClick={() => handleSectionChange("home")}>
                        Home
                    </li>
                    <li className="btn btn-primary" onClick={() => handleSectionChange("create-agriculture-project")}>
                        Create Agriculture Project
                    </li>
                    <li className="btn btn-primary" onClick={() => handleSectionChange("my-projects")}>
                        My Projects
                    </li>
                    <li className="btn btn-primary" onClick={() => handleSectionChange("allocated-products")}>
                        Allocated Products
                    </li>
                    <li className="btn btn-primary" onClick={() => handleSectionChange("payment")}>
                        Payment
                    </li>
                </ul>

                <div className="user-icon-container" onClick={() => setShowDropdown(!showDropdown)}>
                <FaUserCircle size={30} className="user-icon" />
                    {showDropdown && user && (
                        <div className="dropdown-menu">
                            <p><strong>{user.fullName}</strong></p>
                            <p>{user.email}</p>
                            <p>Role: {user.role}</p>

                            {(user.role === "admin" || user.role === "secretary") && (
                                <button className="btn btn-primary" onClick={() => navigate("/admin")}>
                                    Admin Panel
                                </button>
                            )}

                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <div className="dashboard-content">
                {showSection === "home" && (
                    <section>
                        <Home/>
                    </section>
                )}
                {showSection === "create-agriculture-project" && (
                    <section className="dashboard-section">
                        <AgricultureProjectForm />
                    </section>
                )}
                {showSection === "my-projects" && (
                    <section className="dashboard-section">
                        <AgricultureProjects />
                    </section>
                )}
                {showSection === "allocated-products" && (
                    <section className="dashboard-section">
                        <AllocatedProducts />
                    </section>
                )}
                {showSection === "payment" && (
                    <section className="dashboard-section">
                        <ModeOfPayment/>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Dashboard;