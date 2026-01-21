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
    <div className="relative p-20 top-10 left-140 bg- text-">
      <h2>WhatsApp Registration Form</h2>
      <form onSubmit={handleSubmit} className='absolute p-10 top-30 -left-5 border-1 rounded-2xl w-100'>
        <label>Name</label><br /><br />
        <input placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required  className="absolute w-80"/>
        <br /><br />
        <label>Number</label><br /><br />
        <input placeholder="Enter Number with country code (ex: 919876543210)" value={phone} onChange={(e) => setPhone(e.target.value)} required className="absolute w-80" />
        <br /><br /><br />
        <button type="submit" disabled={loading} className=" rounded-2xl absolute left-39 top-58 p-3 bg-blue-500">{loading ? "Registering..." : "Register"}</button>
      </form>
    </div>
  );
}
