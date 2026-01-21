import bcrypt from "bcryptjs";
import { connectDB } from "../lib/mongodb.js";
import User from "../models/User.js";

async function seed() {
  await connectDB();

  await User.deleteMany({});

  const hash = await bcrypt.hash("foryou@123", 10);

  await User.create({
    username: "foryou",
    password: hash
  });

  console.log("User inserted in MongoDB");
  process.exit();
}

seed();
