import { useState } from "react";

export default function AuthForm({ onSubmit, buttonText }) {
  const [form, setForm] = useState({ username: "", password: "" });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="bg-white shadow-lg p-8 rounded-xl max-w-sm mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold mb-5">{buttonText}</h2>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        className="w-full border p-2 rounded mb-4"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        className="w-full border p-2 rounded mb-4"
        required
      />
      <button className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600">
        {buttonText}
      </button>
    </form>
  );
}
