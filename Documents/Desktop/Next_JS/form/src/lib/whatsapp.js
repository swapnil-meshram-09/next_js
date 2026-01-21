import axios from "axios";

export async function sendWhatsAppMessage(phone, message) {
  const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: phone,
    type: "text",
    text: { body: message }
  };

  const headers = {
    Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
    "Content-Type": "application/json"
  };

  await axios.post(url, payload, { headers });
}
