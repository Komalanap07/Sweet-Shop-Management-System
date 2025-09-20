import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered! Login now.");
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input className="w-full mb-3 p-2 border rounded" placeholder="Username" value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})} />
        <input className="w-full mb-3 p-2 border rounded" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input type="password" className="w-full mb-3 p-2 border rounded" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button className="w-full bg-pink-500 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
