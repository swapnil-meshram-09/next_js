// import axios from "axios";

// export async function sendWhatsAppMessage(phone, message) {
//   const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`;

//   const payload = {
//     messaging_product: "whatsapp",
//     to: phone,
//     type: "text",
//     text: { body: message }
//   };

//   const headers = {
//     Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//     "Content-Type": "application/json"
//   };

//   await axios.post(url, payload, { headers });
// }


import Twilio from "twilio";

const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendWhatsAppMessage(to, message) {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER, // Twilio sandbox number
      to: `whatsapp:${to}`,                     // recipient number
      body: message,
    });
    console.log("WhatsApp message sent to", to);
  } catch (err) {
    console.error("Error sending WhatsApp message:", err);
  }
}

