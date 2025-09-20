import React, { useState, useEffect } from "react";
import API from "../api";
import SweetCard from "../components/SweetCard";

export default function Home() {
  const [sweets, setSweets] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    const res = await API.get("/sweets");
    setSweets(res.data);
  };

  const handlePurchase = async (id) => {
    try {
      await API.post(`/sweets/${id}/purchase`);
      fetch();
      alert("Purchased!");
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  const slides = sweets.slice(0, 5).map(s => ({ img: s.img || "https://via.placeholder.com/800x400", title: s.name, subtitle: `₹${s.price}` }));

  return (
    <div className="max-w-6xl mx-auto p-6">
  
      <div className="mt-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Available Sweets</h1>
       
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {sweets.filter(s => s.name.toLowerCase().includes(q.toLowerCase())).map(s => <SweetCard key={s._id} sweet={s} onPurchase={handlePurchase} />)}
      </div>
    </div>
  );
}
