import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../api-service/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("farmer"); // Default role
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const nameParts = fullName.trim().split(/\s+/);
        if (nameParts.length < 2) {
            setError("Please enter at least two names (e.g. Joe Doe).");
            return;
        }

        const result = await authService.register(fullName, email, password, role);

        if (result.success) {
            setSuccessMessage(result.message);
            setError("");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } else {
            setSuccessMessage("");
            setError(result.error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-primary text-white">
            <div className="card p-4 shadow-lg" style={{ width: "400px", backgroundColor: "#004085" }}>
                <h2 className="text-center mb-3">Register</h2>

                {error && <p className="text-danger text-center">{error}</p>}
                {successMessage && <p className="text-success text-center">{successMessage}</p>}

                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Please enter at least two names (e.g. Joe Doe)."
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="farmer">Farmer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100">Register</button>
                </form>

                <p className="text-center mt-3">
                    Already have an account? <Link to="/login" className="text-white">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
