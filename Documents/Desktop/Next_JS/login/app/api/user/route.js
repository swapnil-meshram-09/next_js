import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await connectDB();

  const user = await User.findById(id).select("-password");

  return Response.json(user);
}
