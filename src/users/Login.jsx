import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {authService} from "./authService";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const result = authService.login(email, password);
        if (result.success) {
            navigate("/dashboard");
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white">
            <div className="bg-blue-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" className="w-full p-2 rounded bg-blue-700 text-white mb-2"
                           value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full p-2 rounded bg-blue-700 text-white mb-2"
                           value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="w-full p-2 bg-blue-600 hover:bg-blue-500 rounded mt-2">Login</button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account? <a href="/register" className="text-blue-300">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
