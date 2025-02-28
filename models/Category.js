import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: "string", required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Category" },
});

export const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
