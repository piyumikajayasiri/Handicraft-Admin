import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  color: { type: String, required: true },
  quantity: { type: String, required: true },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
