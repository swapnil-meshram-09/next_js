"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [otpError, setOtpError] = useState("");

  const [loading, setLoading] = useState(false);

  // SEND OTP
  const sendOTP = async () => {
    setLoading(true);
    setSuccessMessage("");
    setOtpError("");

    try {
      const res = await axios.post("/api/register", { name, phone });

      if (res.data.step === "OTP_SENT") {
        setOtpSent(true);
        setSuccessMessage("OTP sent successfully on WhatsApp ✅");
      }
    } catch (error) {
      setSuccessMessage(error.response?.data?.error || "Failed to send OTP");
    }

    setLoading(false);
  };

  // VERIFY OTP
  const verifyOTP = async () => {
    setOtpError("");
    setSuccessMessage("");

    if (otp.trim() === "") {
      setOtpError("Enter OTP ");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/register", { phone, otp });

      if (res.data.step === "VERIFIED") {
        setOtpVerified(true);
        setSuccessMessage("OTP verified successfully ✅");
        setOtpError(""); // clear error if any
      }
    } catch (error) {
      setOtpError(error.response?.data?.error || "Invalid OTP ❌");
    }

    setLoading(false);
  };

  // REGISTER
  const handleRegister = () => {
    if (!otpVerified) {
      setSuccessMessage("Please verify OTP first ⚠️");
      return;
    }
    router.push("/welcome");
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="p-10 border rounded-2xl w-96 bg-white shadow-lg">

        <h2 className="text-2xl font-bold mb-5 text-center">WhatsApp Registration</h2>

        {/* NAME */}
        <label className="block font-medium">Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => {
            const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // letters + spaces only
            setName(value);
          }}
          required
          maxLength={50}
          className="w-full mt-2 p-3 border border-gray-400 rounded-lg outline-none focus:border-blue-500 text-center"
        />

        {/* PHONE */}
        <div className="mt-4">
          <label className="block font-medium">Number</label>
          <input
            type="text"
            placeholder="Enter 10 digit WhatsApp number"
            value={phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // numbers only
              if (value.length <= 10) setPhone(value);
            }}
            maxLength={10}
            inputMode="numeric"
            pattern="[0-9]*"
            required
            className="w-full mt-2 p-3 border border-gray-400 rounded-lg outline-none focus:border-blue-500 text-center"
          />
        </div>

        {/* SEND OTP */}
        {!otpSent && name.trim().length > 0 && phone.length === 10 && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={sendOTP}
              disabled={loading}
              className="p-2 bg-blue-500 rounded text-white w-full"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <p className="text-green-600 text-sm mt-3 text-center">{successMessage}</p>
        )}

        {/* OTP SECTION */}
        {otpSent && (
          <div className="mt-4">
            <label className="block font-medium">Enter 6 Digit OTP</label>
            <input
              type="text"
              placeholder="XXXXXX"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              inputMode="numeric"
              className="w-full mt-2 p-3 border border-gray-400 rounded-lg outline-none focus:border-blue-500 text-center tracking-widest"
            />

            {/* INVALID OTP MESSAGE */}
            {otpError && (
              <p className="text-red-500 text-sm mt-2">{otpError}</p>
            )}

            {/* VERIFY BUTTON */}
            {!otpVerified && (
              <button
                type="button"
                onClick={verifyOTP}
                disabled={loading}
                className="p-2 bg-green-500 rounded-xl text-white w-full mt-3"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            )}
          </div>
        )}

        {/* REGISTER BUTTON ALWAYS VISIBLE */}
        <button
          type="button"
          onClick={handleRegister}
          disabled={!otpVerified}
          className={`p-3 rounded-2xl text-white w-full mt-6 ${
            otpVerified ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Register
        </button>

      </form>
    </div>
  );
}




// "use client";

// import { useState } from "react";
// import axios from "axios";

// export default function Home() {

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");

//   const [otpSent, setOtpSent] = useState(false);
//   const [verified, setVerified] = useState(false);

//   const sendOTP = async () => {
//     await axios.post("/api/register", { name, phone });
//     setOtpSent(true);
//   };

//   const verifyOTP = async () => {
//     const res = await axios.post("/api/register", { phone, otp });

//     if (res.data.step === "VERIFIED") {
//       setVerified(true);
//       alert("Registration Successful");
//     }
//   };

//   return (
//     <div className="p-10">

//       <input placeholder="Name"
//         onChange={e => setName(e.target.value)} />

//       <input placeholder="Phone"
//         onChange={e => setPhone(e.target.value)} />

//       {!otpSent &&
//         <button onClick={sendOTP}>Send OTP</button>
//       }

//       {otpSent &&
//         <>
//           <input placeholder="OTP"
//             onChange={e => setOtp(e.target.value)} />

//           <button onClick={verifyOTP}>Verify OTP</button>
//         </>
//       }

//       {verified && <h2>Registered Successfully ✅</h2>}

//     </div>
//   );
// }
