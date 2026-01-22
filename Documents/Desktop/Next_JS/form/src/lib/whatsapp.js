// export async function sendWhatsAppOTP(phone, otp) {

//   try {

//     const token = process.env.WHATSAPP_TOKEN;
//     const phoneId = process.env.WHATSAPP_PHONE_ID;

//     if (!token || !phoneId) {
//       throw new Error("WhatsApp credentials missing");
//     }

//     const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;

//     const payload = {
//       messaging_product: "whatsapp",
//       to: "91" + phone,
//       type: "text",
//       text: {
//         body: `Your OTP is ${otp}\nValid for 5 minutes`
//       }
//     };

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(payload)
//     });

//     const data = await response.json();

//     console.log("WhatsApp API Response ✅", data);

//     return data;

//   } catch (error) {

//     console.error("WhatsApp Send Error ❌", error);
//     throw error;

//   }
// }



export async function sendWhatsAppOTP(phone, otp) {

  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;

  const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: "91" + phone,
    type: "text",
    text: {
      body: `Your OTP is ${otp}\n\nValid for 5 minutes`
    }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  console.log("WhatsApp API:", data);

  return data;
}
