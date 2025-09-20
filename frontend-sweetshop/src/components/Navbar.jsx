import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ userRole, setUserRole }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("role");
    setUserRole(null);
    navigate("/");
  };

  return (
    <nav className=" text-black px-6 py-3 flex justify-between items-center shadow">
      <Link to="/" className="text-xl font-bold">
        🍬 Sweet Shop
      </Link>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search..."
        className="border px-20 p-2 rounded"
      />

      <div className="space-x-4 flex items-center">
        <Link to="/" className="hidden sm:inline">
         <button className="px-5 font-semibold py-1 rounded border hover:bg-pink-600 hover:text-white">Home</button> 
        </Link>
        {userRole === "admin" ? (
          <>
            <Link to="/admin" className="text-black">
              Admin
            </Link>
            <button
              onClick={logout}
              className="bg-white text-pink-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-black">
              <button className="px-5 font-semibold py-1 rounded border hover:bg-pink-600 hover:text-white">
                Login
              </button>
            </Link>
            <Link to="/register" className="text-black">
<button className="px-5 font-semibold py-1 rounded border hover:bg-pink-600 hover:text-white">Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
