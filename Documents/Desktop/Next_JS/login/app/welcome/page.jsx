"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Welcome() {

  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {

    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      router.push("/");
      return;
    }

    fetch(`/api/user?id=${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));

  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="box bg-black text-white">
      <h1>Welcome {user.username}</h1>
      <p>MongoDB Connected Successfully ✅</p>

      <style jsx>{`
        .box {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
  
        }
      `}</style>
    </div>
  );
}
