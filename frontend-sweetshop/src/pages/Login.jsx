import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setUserRole }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", res.data.role);
      if (res.data.role === "admin") localStorage.setItem("adminToken", token);
      setUserRole(res.data.role);
      navigate(res.data.role === "admin" ? "/admin" : "/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="w-full mb-3 p-2 border rounded" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input type="password" className="w-full mb-3 p-2 border rounded" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button className="w-full bg-pink-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
