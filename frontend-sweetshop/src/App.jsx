import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

export default function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  return (
    <BrowserRouter>
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
