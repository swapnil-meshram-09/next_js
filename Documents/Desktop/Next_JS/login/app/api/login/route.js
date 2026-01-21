import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { username, password } = await req.json();

  await connectDB();

  const user = await User.findOne({ username });

  if (!user) {
    return Response.json(
      { error: "User not found" },
      { status: 400 }
    );
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return Response.json(
      { error: "Wrong password" },
      { status: 400 }
    );
  }

  // SEND USER DATA TO FRONTEND
  return Response.json({
    success: true,
    userId: user._id,
    username: user.username
  });
}
