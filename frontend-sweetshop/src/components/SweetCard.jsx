import React from "react";
import { motion } from "framer-motion";

export default function SweetCard({ sweet, onPurchase }) {
  return (
    <motion.div layout whileHover={{ scale: 1.03 }} className="bg-white shadow rounded-xl p-4">
      {sweet.img ? (
       <img 
  src={sweet.img?.startsWith("http") ? sweet.img : `http://localhost:5000${sweet.img}`} 
  alt={sweet.name} 
  className="w-full h-40 object-cover rounded-md mb-3" 
/>

      ) : (
        <div className="w-full h-40 bg-gray-100 rounded-md mb-3 flex items-center justify-center text-gray-400">No Image</div>
      )}

      <h2 className="font-bold text-lg">{sweet.name}</h2>
      <p className="text-sm text-gray-500">{sweet.category}</p>
      <p className="mt-2 font-semibold">₹{sweet.price}</p>
      <p className="text-gray-600">Qty: {sweet.quantity}</p>

      <button onClick={() => onPurchase(sweet._id)} disabled={sweet.quantity === 0} className={`mt-3 w-full py-2 rounded ${sweet.quantity === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-pink-500 text-white hover:bg-pink-600"}`}>
        {sweet.quantity === 0 ? "Sold Out" : "Purchase"}
      </button>
    </motion.div>
  );
}
