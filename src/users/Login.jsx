import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api-service/authService";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setError("");
    }, [email, password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await authService.login(email, password);
            if (result.success) {
                navigate("/dashboard");
            } else {
                setError(result.error || "Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please check your internet connection.");
        }
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-primary text-white">
            <div className="card p-4 shadow-lg" style={{ width: "400px", backgroundColor: "#1E3A8A" }}>
                <h2 className="text-center mb-3">Login</h2>
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email"
                               value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Password"
                               value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <a href="/register" className="text-light">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
