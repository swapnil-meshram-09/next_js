// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const router = useRouter();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   async function handleLogin(e) {
//     e.preventDefault();

//     const res = await fetch("/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       router.push(`/welcome?user=${username}`);
//     } else {
//       setError(data.error);
//     }
//   }

//   return (
//     <div className="container text-black">
//       <form className="card" onSubmit={handleLogin}>
//         <h2>Welcome Back 👋</h2>

//         <input
//           placeholder="Username"
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button>Login</button>

//         <p className="error">{error}</p>
//       </form>

//       <style jsx>{`
//         .container {
//           height: 100vh;
//           background: linear-gradient(135deg, #667eea, #764ba2);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         .card {
//           background: white;
//           padding: 40px;
//           border-radius: 12px;
//           width: 320px;
//           box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//           display: flex;
//           flex-direction: column;
//           gap: 15px;
//         }

//         input {
//           padding: 10px;
//           border-radius: 6px;
//           border: 1px solid #ddd;
//         }

//         button {
//           padding: 10px;
//           background: #667eea;
//           border: none;
//           color: white;
//           font-weight: bold;
//           border-radius: 6px;
//           cursor: pointer;
//         }

//         button:hover {
//           background: #5a67d8;
//         }

//         .error {
//           color: red;
//           font-size: 14px;
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {

      // SAVE LOGIN SESSION DATA
      sessionStorage.setItem("userId", data.userId);

      router.push("/welcome");

    } else {
      setError(data.error);
    }
  }

  return (
    <div className="container text-black">
      <form className="card" onSubmit={handleLogin}>
        <h2>Login Account</h2>

        <input
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button>Login</button>

        <p className="error">{error}</p>
      </form>

      <style jsx>{`
        .container {
          height: 100vh;
          background: linear-gradient(to right, #4facfe, #00f2fe);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .card {
          background: white;
          padding: 40px;
          width: 320px;
          border-radius: 12px;
          box-shadow: 0 10px 20px rgba(0,0,0,.2);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        input {
          padding: 10px;
        }

        button {
          background: #4facfe;
          border: none;
          padding: 10px;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .error {
          color: red;
        }
      `}</style>
    </div>
  );
}
