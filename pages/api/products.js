import { connectDB } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default async function handle(req, res) {
  const { method } = req;
  await connectDB();

  if (method === "GET") {
    try {
      if (req.query?.id) {
        res.json(await Product.findOne({ _id: req.query.id }));
      } else {
        const products = await Product.find();
        return res.status(200).json(products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  if (method === "POST") {
    try {
      const { title, description, price, images, category, color, quantity } =
        req.body;

      // Validate input data (ensure all required fields are provided)
      if (
        !title ||
        !description ||
        !price ||
        !images ||
        !category ||
        !color ||
        !quantity
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const productDoc = await Product.create({
        title,
        description,
        price,
        images,
        category,
        color,
        quantity,
      });
      return res.status(201).json(productDoc);
    } catch (error) {
      console.error("Error in API Route:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (method === "PUT") {
    try {
      const {
        _id,
        title,
        description,
        price,
        images,
        category,
        color,
        quantity,
      } = req.body;

      if (!_id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        _id,
        { title, description, price, images, category, color, quantity }, // Update image URL as well
        { new: true } // Return the updated document
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error in API Route:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Delete API (no change required)
  if (method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Error in DELETE API:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
