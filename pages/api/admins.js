import { Admin } from "@/models/Admins";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { connectDB } from "@/lib/mongoose";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await connectDB();

  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const exists = await Admin.findOne({ email });

    if (exists) return res.status(400).json({ error: "Admin already exists" });

    const admin = new Admin({ email });
    await admin.save();

    return res.status(201).json({ message: "Admin added", admin });
  }

  if (req.method === "GET") {
    const admins = await Admin.find({});
    return res.status(200).json(admins);
  }

  if (req.method === "DELETE") {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    await Admin.deleteOne({ email });

    return res.status(200).json({ message: "Admin deleted" });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
