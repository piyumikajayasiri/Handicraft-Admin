import { connectDB } from "@/lib/mongoose";
import { Admin } from "@/models/Admins";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    // Fetch all admins
    const admins = await Admin.find();
    return res.json(admins);
  }

  if (req.method === "POST") {
    // Add new admin
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ error: "Admin already exists" });

    const newAdmin = await Admin.create({ email });
    return res.json(newAdmin);
  }

  if (req.method === "DELETE") {
    // Delete an admin
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    await Admin.findOneAndDelete({ email });
    return res.json({ success: true });
  }

  res.status(405).end(); // Method Not Allowed
}
