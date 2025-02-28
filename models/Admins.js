import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
