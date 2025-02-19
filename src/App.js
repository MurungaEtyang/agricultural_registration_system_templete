import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./users/Login";
import Register from "./users/Register";
import Dashboard from "./home/Dashboard";
import AdminDashboard from "./admin/adminDashboard";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
  );
}

export default App;
