import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

export async function POST(req) {
  try {
    const { name, phone } = await req.json();

    if (!name || !phone) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectDB();

    // Prevent duplicate registration
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return Response.json({ error: "User already registered" }, { status: 409 });
    }

    // Save user
    const user = await User.create({ name, phone });

    // Send WhatsApp message
    const message = `Hello ${name} 👋\nYour registration is successful ✅`;
    await sendWhatsAppMessage(phone, message);

    return Response.json({ success: true, message: "Registered & WhatsApp sent" });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
