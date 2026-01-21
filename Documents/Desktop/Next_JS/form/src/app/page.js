"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/register", { name, phone });
      alert(res.data.message);
      setName("");
      setPhone("");
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="absolute p-20 top-10 left-140 bg-center bg-whit text-white">
      <h2>WhatsApp Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <br /><br />
        <input placeholder="Phone with country code (ex: 919876543210)" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <br /><br />
        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
    </div>
  );
}
