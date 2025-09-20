import React, { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard() {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "", img: "" });

  useEffect(()=>{ fetch(); }, []);

  const fetch = async () => {
    const res = await API.get("/sweets");
    setSweets(res.data);
  };

  const add = async (e) => {
    e.preventDefault();
    try {
      await API.post("/sweets", form);
      setForm({ name: "", category: "", price: "", quantity: "", img: "" });
      fetch();
    } catch (err) { alert(err.response?.data?.error || err.message); }
  };

  const remove = async (id) => {
    if (!confirm("Delete?")) return;
    await API.delete(`/sweets/${id}`);
    fetch();
  };

  const restock = async (id) => {
    const amt = prompt("Restock amount", "10");
    if (!amt) return;
    await API.post(`/sweets/${id}/restock`, { amount: Number(amt) });
    fetch();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">Admin Dashboard</h1>

      <form onSubmit={add} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="p-2 border rounded" required/>
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="p-2 border rounded" required/>
        <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="p-2 border rounded" required/>
        <input placeholder="Quantity" type="number" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} className="p-2 border rounded" required/>
        <input placeholder="Image URL" value={form.img} onChange={e=>setForm({...form,img:e.target.value})} className="p-2 border rounded col-span-2" />
        <button className="bg-pink-500 text-white py-2 rounded col-span-2">Add Sweet</button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {sweets.map(s => (
          <div key={s._id} className="bg-white p-4 rounded shadow">
            <img src={s.img || "https://via.placeholder.com/300x200"} alt={s.name} className="w-full h-40 object-cover rounded mb-3"/>
            <h3 className="font-bold">{s.name}</h3>
            <p>₹{s.price} • {s.quantity} qty</p>
            <div className="mt-3 flex gap-2">
              <button onClick={()=>restock(s._id)} className="px-3 py-1 bg-green-500 text-white rounded">Restock</button>
              <button onClick={()=>remove(s._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
