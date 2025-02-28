import { Category } from "@/models/Category";
import { connectDB } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await connectDB();
  if (method === "GET") {
    try {
      if (req.query?.id) {
        res.json(await Product.findOne({ _id: req.query.id }));
      } else {
        const category = await Category.find().populate("parent");
        return res.status(200).json(category);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  if (method === "POST") {
    try {
      const { name, parentCategory } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Category name is required" });
      }

      const categoryDoc = await Category.create({
        name,
        parent: parentCategory ? parentCategory : null, // Ensure parent is null if not provided
      });

      return res.status(201).json(categoryDoc);
    } catch (error) {
      console.error("Error creating category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (method === "PUT") {
    try {
      const { _id, name, parentCategory } = req.body;
      if (!_id || !name) {
        return res.status(400).json({ error: "ID and name are required" });
      }
      await Category.findByIdAndUpdate(_id, {
        name,
        parent: parentCategory || null,
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error updating category:", error);
      return res.status(500).json({ error: "Failed to update category" });
    }
  }

  if (method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: "Category ID is required" });
      }
      await Category.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error deleting category:", error);
      return res.status(500).json({ error: "Failed to delete category" });
    }
  }
  return res.status(405).json({ error: "Method Not Allowed" });
}
